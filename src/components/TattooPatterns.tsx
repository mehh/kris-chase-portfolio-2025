"use client";

import React from "react";

// Tattoo Patterns Component - SVG-based geometric patterns inspired by tattoo designs
export default function TattooPatterns() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Main pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <HexRingWallpaper size={48} strokeWidth={1.75} stroke="#b46633" bg="transparent" opacity={0.9} />
      </div>
      
      {/* Secondary pattern overlay */}
      <div className="absolute inset-0 opacity-15">
        <AsanohaWallpaper size={40} strokeWidth={1.5} stroke="#96442e" bg="transparent" opacity={0.85} />
      </div>
      
      {/* Accent pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <FlowerOfLifeWallpaper size={54} strokeWidth={1.25} stroke="#ffff00" bg="transparent" opacity={0.9} />
      </div>
      
      {/* Subtle node pattern */}
      <div className="absolute inset-0 opacity-8">
        <TriHexNodesWallpaper 
          size={44} 
          strokeWidth={1.5} 
          stroke="#ffffff" 
          nodeFill="#ffffff" 
          nodeRadius={1.6} 
          bg="transparent" 
          opacity={0.85} 
        />
      </div>
    </div>
  );
}

/**
 * 1) HEX RING PATTERN — concentric hexagons tiled on a hex grid
 *    Approximates the lower-arm motif with outlined hexes + inner rings
 */
export function HexRingWallpaper({
  size = 48,
  stroke = "#fff",
  strokeWidth = 1.5,
  bg = "transparent",
  opacity = 1,
}: {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  bg?: string;
  opacity?: number;
}) {
  const h = size; // hex outer radius-like cell height
  const w = (Math.sqrt(3) / 2) * h; // width for pointy-top hex grid
  const id = `hexring-${Math.round(size * 1000)}-${Math.round(strokeWidth * 1000)}`;

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${w * 2} ${h * 1.5}`} xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <pattern id={id} width={w * 2} height={h * 1.5} patternUnits="userSpaceOnUse" x={0} y={0}>
          <rect width="100%" height="100%" fill={bg} />
          {/* Row 1 */}
          <g opacity={opacity} stroke={stroke} strokeWidth={strokeWidth} fill="none">
            {hexAt(w * 0.5, h * 0.5, h * 0.5)}
            {ringHexAt(w * 1.5, h * 0.5, h * 0.33)}
          </g>
          {/* Row 2 offset */}
          <g opacity={opacity} stroke={stroke} strokeWidth={strokeWidth} fill="none">
            {ringHexAt(0, h * 1.25, h * 0.33)}
            {hexAt(w, h * 1.25, h * 0.5)}
            {ringHexAt(w * 2, h * 1.25, h * 0.33)}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function hexPath(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30); // pointy-top
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  return `M ${pts.map((p) => p.join(",")).join(" L ")} Z`;
}

function hexAt(cx: number, cy: number, r: number) {
  return <path d={hexPath(cx, cy, r)} />;
}

function ringHexAt(cx: number, cy: number, r: number) {
  return (
    <g>
      <path d={hexPath(cx, cy, r)} />
      <path d={hexPath(cx, cy, r * 0.58)} />
    </g>
  );
}

/**
 * 2) ASANOHA (Japanese hemp) / star lattice — matches your mid-arm starry field
 */
export function AsanohaWallpaper({
  size = 40,
  stroke = "#fff",
  strokeWidth = 1.2,
  bg = "transparent",
  opacity = 1,
}: {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  bg?: string;
  opacity?: number;
}) {
  // Tile fundamentals for an Asanoha unit (built from two overlapped equilateral triangles per cell)
  const s = size;
  const w = s * Math.sqrt(3);
  const h = s * 1.5;
  const id = `asanoha-${Math.round(s * 1000)}-${Math.round(strokeWidth * 1000)}`;

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill={bg} />
          <g stroke={stroke} strokeWidth={strokeWidth} fill="none" opacity={opacity}>
            {asanohaCell(0, 0, s)}
            {asanohaCell(w / 2, h / 2, s)}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function asanohaCell(x: number, y: number, s: number) {
  // Draw the classic 6-pointed star from 6 isosceles triangles in a hex arrangement
  const r = s; // radius
  const lines: JSX.Element[] = [];
  for (let i = 0; i < 6; i++) {
    const a1 = (Math.PI / 3) * i;
    const a2 = a1 + Math.PI / 3;
    const cx = x + (Math.sqrt(3) / 2) * r;
    const cy = y + r / 2;
    const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
    const p2 = [cx, cy];
    const p3 = [cx + r * Math.cos(a2), cy + r * Math.sin(a2)];
    lines.push(<path key={`tri-${i}-${x}-${y}`} d={`M ${p1[0]},${p1[1]} L ${p2[0]},${p2[1]} L ${p3[0]},${p3[1]}`} />);
  }
  return <g>{lines}</g>;
}

/**
 * 3) FLOWER OF LIFE — overlapping circle lattice
 */
export function FlowerOfLifeWallpaper({
  size = 54,
  stroke = "#fff",
  strokeWidth = 1.2,
  bg = "transparent",
  opacity = 1,
}: {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  bg?: string;
  opacity?: number;
}) {
  const r = size / 2;
  const w = r * Math.sqrt(3) * 2; // width of two offsets
  const h = r * 3; // two vertical offsets
  const id = `fol-${Math.round(size * 1000)}-${Math.round(strokeWidth * 1000)}`;

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill={bg} />
          <g stroke={stroke} strokeWidth={strokeWidth} fill="none" opacity={opacity}>
            {flowerTile(r)}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function flowerTile(r: number) {
  const dx = r * Math.sqrt(3);
  const dy = r * 1.5;
  const centers = [
    [dx * 0.5, r * 0.5],
    [dx * 1.5, r * 0.5],
    [dx, r * 0.5 + r],
    [dx * 0.5, r * 0.5 + r * 2],
    [dx * 1.5, r * 0.5 + r * 2],
    [dx, r * 0.5 + r * 3],
  ];
  return (
    <g>
      {centers.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} />
      ))}
    </g>
  );
}

/**
 * 4) TRI-HEX NODES — hexagonal/triangular grid with dot nodes at intersections
 */
export function TriHexNodesWallpaper({
  size = 44,
  stroke = "#fff",
  strokeWidth = 1.2,
  nodeFill = "#fff",
  nodeRadius = 1.4,
  bg = "transparent",
  opacity = 1,
}: {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  nodeFill?: string;
  nodeRadius?: number;
  bg?: string;
  opacity?: number;
}) {
  const s = size;
  const w = Math.sqrt(3) * s;
  const h = 1.5 * s;
  const id = `trihex-${Math.round(s * 1000)}-${Math.round(strokeWidth * 1000)}`;

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" role="img">
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill={bg} />
          <g stroke={stroke} strokeWidth={strokeWidth} fill="none" opacity={opacity}>
            {triHexCell(0, 0, s)}
          </g>
          {/* nodes at intersections */}
          <g fill={nodeFill} opacity={opacity}>
            {triHexNodes(0, 0, s, nodeRadius)}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

function triHexCell(x: number, y: number, s: number) {
  const a = (Math.sqrt(3) / 2) * s;
  const cx = x + a;
  const cy = y + s / 2;
  const r = s / 2;
  const p = (angle: number) => [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  const pts = [
    p(-Math.PI / 6),
    p(Math.PI / 6),
    p(Math.PI / 2),
    p((5 * Math.PI) / 6),
    p((-5 * Math.PI) / 6),
    p(-Math.PI / 2),
  ];
  const d = `M ${pts.map((q) => q.join(",")).join(" L ")} Z`;
  // inner triangles (like star lines)
  const inner = [
    [pts[0], pts[2]],
    [pts[2], pts[4]],
    [pts[4], pts[0]],
  ]
    .map(([p1, p2]) => `M ${p1[0]},${p1[1]} L ${p2[0]},${p2[1]}`)
    .join(" ");
  return (
    <g>
      <path d={d} />
      <path d={inner} />
    </g>
  );
}

function triHexNodes(x: number, y: number, s: number, r: number) {
  const a = (Math.sqrt(3) / 2) * s;
  const cx = x + a;
  const cy = y + s / 2;
  const r2 = s / 2;
  const angles = [
    -Math.PI / 6,
    Math.PI / 6,
    Math.PI / 2,
    (5 * Math.PI) / 6,
    (-5 * Math.PI) / 6,
    -Math.PI / 2,
  ];
  const vertices = angles.map((ang) => [cx + r2 * Math.cos(ang), cy + r2 * Math.sin(ang)]);
  const centers = [
    [cx, cy],
    [(vertices[0][0] + vertices[1][0]) / 2, (vertices[0][1] + vertices[1][1]) / 2],
    [(vertices[1][0] + vertices[2][0]) / 2, (vertices[1][1] + vertices[2][1]) / 2],
    [(vertices[2][0] + vertices[3][0]) / 2, (vertices[2][1] + vertices[3][1]) / 2],
    [(vertices[3][0] + vertices[4][0]) / 2, (vertices[3][1] + vertices[4][1]) / 2],
    [(vertices[4][0] + vertices[5][0]) / 2, (vertices[4][1] + vertices[5][1]) / 2],
    [(vertices[5][0] + vertices[0][0]) / 2, (vertices[5][1] + vertices[0][1]) / 2],
  ];
  return (
    <g>
      {vertices.map(([vx, vy], i) => (
        <circle key={`v-${i}`} cx={vx} cy={vy} r={r} />
      ))}
      {centers.map(([vx, vy], i) => (
        <circle key={`c-${i}`} cx={vx} cy={vy} r={r} />
      ))}
    </g>
  );
}
