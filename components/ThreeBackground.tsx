'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup with shared geometries and materials
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    // Use lower pixel ratio for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create shared geometry and materials
    const nodeGeometry = new THREE.SphereGeometry(0.5, 12, 12); // Reduced segments
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xA5D7E8,
      transparent: true,
      opacity: 0.7,
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xA5D7E8,
      transparent: true,
      opacity: 0.2,
    });

    // Create nodes with optimized count
    const nodes: THREE.Mesh[] = [];
    const nodeConnections: THREE.Line[] = [];
    const nodesCount = 10; // Reduced number of nodes

    // Object pool for line geometries
    const lineGeometryPool: THREE.BufferGeometry[] = [];
    for (let i = 0; i < nodesCount * 2; i++) {
      lineGeometryPool.push(new THREE.BufferGeometry());
    }
    let currentLineGeometry = 0;

    // Create nodes with optimized initialization
    for (let i = 0; i < nodesCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        THREE.MathUtils.randFloatSpread(40),
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20)
      );
      node.userData = {
        velocity: new THREE.Vector3(
          THREE.MathUtils.randFloat(-0.01, 0.01),
          THREE.MathUtils.randFloat(-0.005, 0.005),
          THREE.MathUtils.randFloat(-0.005, 0.005)
        )
      };
      nodes.push(node);
      scene.add(node);
    }

    // Optimized connection update function
    const updateConnections = () => {
      // Remove old connections
      nodeConnections.forEach(line => scene.remove(line));
      nodeConnections.length = 0;
      currentLineGeometry = 0;

      // Create new connections with distance optimization
      const positions = [];
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const distance = nodeA.position.distanceTo(nodeB.position);
          
          if (distance < 12) { // Reduced connection distance
            positions.push(nodeA.position, nodeB.position);
            
            if (currentLineGeometry < lineGeometryPool.length) {
              const geometry = lineGeometryPool[currentLineGeometry];
              geometry.setFromPoints([nodeA.position, nodeB.position]);
              const line = new THREE.Line(geometry, lineMaterial);
              nodeConnections.push(line);
              scene.add(line);
              currentLineGeometry++;
            }
          }
        }
      }
    };

    camera.position.z = 30;

    // Optimized animation loop
    let frameCount = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Update node positions with reduced frequency
      nodes.forEach(node => {
        node.position.add(node.userData.velocity);

        // Bounce off boundaries with simplified checks
        ['x', 'y', 'z'].forEach(axis => {
          if (Math.abs(node.position[axis]) > 20) {
            node.userData.velocity[axis] *= -1;
          }
        });
      });

      // Update connections less frequently
      if (frameCount % 2 === 0) {
        updateConnections();
      }

      // Rotate scene with reduced speed
      scene.rotation.y += 0.0005;
      scene.rotation.x += 0.0002;

      renderer.render(scene, camera);
      frameCount++;
    };

    animate();

    // Optimized resize handler with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      // Clean up resources
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      lineGeometryPool.forEach(geometry => geometry.dispose());
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 bg-gradient-to-b from-[#0B2447] to-[#19376D]"
      style={{ zIndex: 0 }}
    />
  );
}