"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import type * as THREE from "three";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";
import { useInView } from "framer-motion";

function RotatingBox({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime();
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

function RotatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime();
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

function RotatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.7;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.3]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

function VisibleCanvas({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    margin: "-10% 0px -10% 0px",
    amount: 0.2,
  });

  return (
    <div ref={ref} className="h-64 relative">
      {isInView ? (
        <Canvas
          camera={{ position: [0, 0, 3] }}
          gl={{ antialias: false, powerPreference: "low-power" }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}

export default function ThreeUp() {
  const [showOutlines, setShowOutlines] = useState([false, false, false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Show outlines with staggered delay
      const delays = [0, 1000, 2000, 3000, 4000];
      delays.forEach((delay, index) => {
        setTimeout(() => {
          setShowOutlines(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, delay);
      });

      // Reset after all have shown
      setTimeout(() => {
        setShowOutlines([false, false, false, false, false]);
      }, 5000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Register ThreeUp content for Machine View
  useMachineSlice({
    type: "section",
    title: "Three Up",
    path: "/",
    order: 28,
    content: [
      "### Heading",
      "Leading teams to success",
      "",
      "### Themes",
      "- Plan your mission, goals and objectives",
      "- Analyze industry positioning",
      "- Evaluate, modify, repeat",
    ].join("\n"),
  }, []);

  return (
    <div id="shopify-section-home-second-menu" className="shopify-section threeUp">
      <section className="second-menu py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:pl-8 md:pl-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 sm:mb-12">
            <div className="headline mb-6 sm:mb-8 lg:mb-0">
              <p className="text-lg sm:text-xl font-heading uppercase text-secondary-foreground/90">Leading teams to success</p>
            </div>
            <div className="title flex flex-col">
              {Array.from({ length: 5 }, (_, index) => (
                <p 
                  key={index}
                  className={`outline text-2xl sm:text-3xl md:text-4xl font-heading uppercase transition-opacity duration-500 text-secondary-foreground ${
                    showOutlines[index] ? 'opacity-100' : 'opacity-20'
                  }`}
                >
                  Kris Chase
                </p>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="grid-item">
              <div className="plane-wrapper mb-4">
                <a href="https://krischase.com" className="plane-inner block">
                  <div className="hover-plane image relative overflow-hidden rounded-lg">
                    <VisibleCanvas>
                      <RotatingBox position={[0, 0, 0]} />
                      <ambientLight intensity={0.5} />
                    </VisibleCanvas>
                  </div>
                </a>
              </div>
              <div className="title text-2xl font-heading uppercase mb-2 text-secondary-foreground">
                Build a better future for your business
              </div>
            </div>

            <div className="grid-item">
              <div className="plane-wrapper mb-4">
                <a href="https://krischase.com" className="plane-inner block">
                  <div className="hover-plane image relative overflow-hidden rounded-lg">
                    <VisibleCanvas>
                      <RotatingSphere position={[0, 0, 0]} />
                      <ambientLight intensity={0.5} />
                    </VisibleCanvas>
                  </div>
                </a>
              </div>
              <div className="title text-2xl font-heading uppercase mb-2 text-secondary-foreground">
                Unlock the full potential of your team
              </div>
            </div>

            <div className="grid-item">
              <div className="plane-wrapper mb-4">
                <a href="https://krischase.com" className="plane-inner block">
                  <div className="hover-plane image relative overflow-hidden rounded-lg">
                    <VisibleCanvas>
                      <RotatingTorus position={[0, 0, 0]} />
                      <ambientLight intensity={0.5} />
                    </VisibleCanvas>
                  </div>
                </a>
              </div>
              <div className="title text-2xl font-heading uppercase mb-2 text-secondary-foreground">
                Succeed in a rapidly changing world
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
