'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create nodes (spheres)
    const nodes: THREE.Mesh[] = [];
    const nodeConnections: THREE.Line[] = [];
    const nodesCount = 15;
    const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xA5D7E8,
      transparent: true,
      opacity: 0.7,
    });

    // Create nodes in a distributed pattern
    for (let i = 0; i < nodesCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        THREE.MathUtils.randFloatSpread(40),
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20)
      );
      node.userData = {
        velocity: new THREE.Vector3(
          THREE.MathUtils.randFloat(-0.02, 0.02),
          THREE.MathUtils.randFloat(-0.01, 0.01),
          THREE.MathUtils.randFloat(-0.01, 0.01)
        )
      };
      nodes.push(node);
      scene.add(node);
    }

    // Line material for connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xA5D7E8,
      transparent: true,
      opacity: 0.2,
    });

    // Function to update connections between nodes
    const updateConnections = () => {
      // Remove old connections
      nodeConnections.forEach(line => scene.remove(line));
      nodeConnections.length = 0;

      // Create new connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].position.distanceTo(nodes[j].position);
          if (distance < 15) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position
            ]);
            const line = new THREE.Line(geometry, lineMaterial);
            nodeConnections.push(line);
            scene.add(line);
          }
        }
      }
    };

    camera.position.z = 30;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update node positions
      nodes.forEach(node => {
        node.position.add(node.userData.velocity);

        // Bounce off boundaries
        ['x', 'y', 'z'].forEach(axis => {
          if (Math.abs(node.position[axis]) > 20) {
            node.userData.velocity[axis] *= -1;
          }
        });
      });

      // Update connections
      updateConnections();

      // Rotate entire scene slightly
      scene.rotation.y += 0.001;
      scene.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
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