"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import * as THREE from "three";
import { useInView } from "framer-motion";

// Convert lat/long (degrees) to 3D position on a sphere of given radius.
function latLngToVec3(lat: number, lng: number, radius = 1): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

const LOCATIONS = [
  { label: "United States — SF Bay Area", lat: 37.7749, lng: -122.4194 },
  { label: "United States — New York", lat: 40.7128, lng: -74.006 },
  { label: "Canada — Toronto", lat: 43.6532, lng: -79.3832 },
  { label: "Canada — Vancouver", lat: 49.2827, lng: -123.1207 },
  { label: "United Kingdom — London", lat: 51.5074, lng: -0.1278 },
  { label: "India — Bengaluru", lat: 12.9716, lng: 77.5946 },
  { label: "Eastern Europe — Warsaw", lat: 52.2297, lng: 21.0122 },
  { label: "Armenia — Yerevan", lat: 40.1792, lng: 44.4991 },
  { label: "Mexico — Mexico City", lat: 19.4326, lng: -99.1332 },
  { label: "Brazil — São Paulo", lat: -23.5505, lng: -46.6333 },
  { label: "South America — Buenos Aires", lat: -34.6037, lng: -58.3816 },
];

function Atmosphere({ radius = 1.08 }: { radius?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshBasicMaterial color={"#ffffff"} transparent opacity={0.05} />
    </mesh>
  );
}

function Earth({ radius = 1.1 }: { radius?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhongMaterial color={"#000000"} emissive={"#111111"} shininess={8} />
    </mesh>
  );
}

function LatLine({ lat, radius = 1.105 }: { lat: number; radius?: number }) {
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let deg = 0; deg <= 360; deg += 5) {
      const [x, y, z] = latLngToVec3(lat, deg, radius);
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, [lat, radius]);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.16} />
    </line>
  );
}

function LonLine({ lon, radius = 1.105 }: { lon: number; radius?: number }) {
  const positions = useMemo(() => {
    const pts: number[] = [];
    for (let deg = -90; deg <= 90; deg += 5) {
      const [x, y, z] = latLngToVec3(deg, lon, radius);
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, [lon, radius]);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.16} />
    </line>
  );
}

function Marker({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state: RootState) => {
    if (!ref.current) return;
    // Gentle pulse
    const s = 1 + Math.sin(state.clock.getElapsedTime() * 2.0) * 0.15;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* A small line pointing outwards for readability */}
      <mesh position={[position[0] * 0.06, position[1] * 0.06, position[2] * 0.06]}>
        <boxGeometry args={[0.003, 0.003, 0.12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null!);

  // Precompute marker positions
  const markers = useMemo(() => {
    return LOCATIONS.map((loc) => ({ ...loc, pos: latLngToVec3(loc.lat, loc.lng, 1.15) as [number, number, number] }));
  }, []);

  useFrame((state: RootState) => {
    if (!groupRef.current) return;
    // Auto-rotate
    groupRef.current.rotation.y += 0.0012;
    // Slight bob for life
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.015;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={0.9} color={"#ffffff"} />
      <Earth radius={1} />
      {/* Graticule lines for geographic context */}
      {[-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map((lat) => (
        <LatLine key={`lat-${lat}`} lat={lat} />
      ))}
      {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180].map((lon) => (
        <LonLine key={`lon-${lon}`} lon={lon} />
      ))}
      <Atmosphere radius={1.16} />
      {markers.map((m, i) => (
        <Marker key={i} position={m.pos} />
      ))}
    </group>
  );
}

function VisibleCanvas({ children, height = 560 }: { children: React.ReactNode; height?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", amount: 0.2 });
  return (
    <div ref={ref} className="relative" style={{ height }}>
      {isInView ? (
        <Canvas camera={{ position: [0, 0, 2.1] }} gl={{ antialias: false, powerPreference: "low-power" }} dpr={[1, 1.25]}>
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}

export function GlobalTeamsGlobe() {
  return (
    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm p-4">
      <VisibleCanvas height={560}>
        <GlobeScene />
      </VisibleCanvas>
      <div className="mt-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
        Led and collaborated with teams in:
        <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 list-disc pl-5">
          {LOCATIONS.map((l, i) => (
            <li key={i}>{l.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
