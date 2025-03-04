'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Performance settings based on device
    const particleCount = isMobile ? 6 : 10;
    const connectionDistance = isMobile ? 8 : 12;
    const updateFrequency = isMobile ? 3 : 2; // Higher number = less frequent updates
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);

    // Scene setup with shared geometries and materials
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: !isMobile, // Disable antialiasing on mobile
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp' // Lower precision on mobile
    });
    
    // Apply hardware acceleration
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Enable optimizations
    renderer.shadowMap.enabled = false;
    // renderer.physicallyCorrectLights = false;
    
    // Add canvas with hardware acceleration
    const canvas = renderer.domElement;
    canvas.style.transform = 'translateZ(0)'; // Force GPU acceleration
    canvas.style.willChange = 'transform'; // Hint for browser optimization
    containerRef.current.appendChild(canvas);

    // Create shared geometry with reduced complexity for mobile
    const nodeGeometry = new THREE.SphereGeometry(0.5, isMobile ? 8 : 12, isMobile ? 8 : 12);
    
    // Use simpler materials for better performance
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xA5D7E8,
      transparent: true,
      opacity: 0.7,
      depthWrite: false // Performance optimization
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xA5D7E8,
      transparent: true,
      opacity: 0.2,
      depthWrite: false // Performance optimization
    });

    // Create nodes with optimized count
    const nodes: THREE.Mesh[] = [];
    const nodeConnections: THREE.Line[] = [];

    // Object pool for line geometries to reduce garbage collection
    const lineGeometryPool: THREE.BufferGeometry[] = [];
    for (let i = 0; i < particleCount * 2; i++) {
      lineGeometryPool.push(new THREE.BufferGeometry());
    }
    let currentLineGeometry = 0;

    // Create nodes with optimized initialization
    for (let i = 0; i < particleCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      // Distribute nodes in a more controlled way
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      node.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.5, // Flatten vertically
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      // Slower movement for better performance and visual appeal
      const speed = isMobile ? 0.003 : 0.005;
      node.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed * 0.5,
          (Math.random() - 0.5) * speed
        ),
        // Add initial phase for smoother animation
        phase: Math.random() * Math.PI * 2
      };
      
      nodes.push(node);
      scene.add(node);
    }

    // Optimized connection update function with object pooling
    const updateConnections = () => {
      // Remove old connections
      nodeConnections.forEach(line => scene.remove(line));
      nodeConnections.length = 0;
      currentLineGeometry = 0;

      // Create new connections with distance optimization
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const distance = nodeA.position.distanceTo(nodeB.position);
          
          if (distance < connectionDistance) {
            // Use object pooling to avoid creating new geometries
            if (currentLineGeometry < lineGeometryPool.length) {
              const geometry = lineGeometryPool[currentLineGeometry];
              geometry.setFromPoints([nodeA.position, nodeB.position]);
              
              // Set opacity based on distance for a more natural look
              const opacity = 0.2 * (1 - distance / connectionDistance);
              const lineMat = lineMaterial.clone();
              lineMat.opacity = opacity;
              
              const line = new THREE.Line(geometry, lineMat);
              nodeConnections.push(line);
              scene.add(line);
              currentLineGeometry++;
            }
          }
        }
      }
    };

    camera.position.z = 30;

    // Animation variables
    let frameCount = 0;
    let lastTime = 0;
    const rotationSpeed = isMobile ? 0.0002 : 0.0003;
    
    // Use requestAnimationFrame for smoother animations
    const animate = (time: number) => {
      const animationId = requestAnimationFrame(animate);
      
      // Calculate delta time for smooth animation regardless of frame rate
      const delta = time - lastTime;
      lastTime = time;
      
      // Skip frames on mobile for better performance
      frameCount++;
      if (isMobile && frameCount % 2 !== 0) {
        return;
      }

      // Update node positions with time-based animation
      const timeOffset = time * 0.001;
      nodes.forEach(node => {
        // Add subtle oscillation for more organic movement
        const phase = node.userData.phase;
        node.position.x += Math.sin(timeOffset + phase) * 0.01 + node.userData.velocity.x;
        node.position.y += Math.cos(timeOffset + phase * 0.7) * 0.005 + node.userData.velocity.y;
        node.position.z += Math.sin(timeOffset + phase * 1.3) * 0.01 + node.userData.velocity.z;

        // Bounce off boundaries with simplified checks
        const bounds = 20;
        if (Math.abs(node.position.x as number) > bounds) {
          node.userData.velocity.x *= -1;
        }
        if (Math.abs(node.position.y as number) > bounds) {
          node.userData.velocity.y *= -1;
        }
        if (Math.abs(node.position.z as number) > bounds) {
          node.userData.velocity.z *= -1;
        }
      });

      // Update connections less frequently for better performance
      if (frameCount % updateFrequency === 0) {
        updateConnections();
      }

      // Smooth rotation based on delta time
      scene.rotation.y += rotationSpeed * delta;
      scene.rotation.x += rotationSpeed * 0.4 * delta;

      renderer.render(scene, camera);
    };

    // Start animation loop
    const animationId = requestAnimationFrame(animate);

    // Optimized resize handler with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Update camera aspect ratio
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        // Update renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update mobile detection
        setIsMobile(window.innerWidth < 768);
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    // Clean up resources
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
      
      // Dispose of all resources to prevent memory leaks
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      lineGeometryPool.forEach(geometry => geometry.dispose());
      renderer.dispose();
      
      // Remove canvas
      if (containerRef.current && canvas.parentNode === containerRef.current) {
        containerRef.current.removeChild(canvas);
      }
      
      // Clear references
      nodes.length = 0;
      nodeConnections.length = 0;
    };
  }, [isMobile]); // Re-initialize when mobile state changes

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 bg-gradient-to-b from-[#0B2447] to-[#19376D]"
      style={{ 
        zIndex: 0,
        willChange: 'transform', // Hint for browser optimization
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden' // Additional optimization
      }}
      aria-hidden="true" // Accessibility improvement
    />
  );
}