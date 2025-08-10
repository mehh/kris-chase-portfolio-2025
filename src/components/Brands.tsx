"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Brand = { 
  file: string; 
  name: string;
  color: string; // Brand color for hover effects
};

const brands: Brand[] = [
  { file: "VirginOrbit.png", name: "Virgin Orbit", color: "#E31E24" },
  { file: "HiChew.png", name: "Hi-Chew", color: "#FF6B35" },
  { file: "johnny-rockets.png", name: "Johnny Rockets", color: "#D32F2F" },
  { file: "PetIQ.png", name: "PetIQ", color: "#4CAF50" },
  { file: "Orchid.png", name: "Orchid", color: "#9C27B0" },
  { file: "FlameBroiler.png", name: "The Flame Broiler", color: "#FF5722" },
  { file: "Wahoos.png", name: "Wahoo's", color: "#2196F3" },
  { file: "Sugarfina.png", name: "Sugarfina", color: "#E91E63" },
  { file: "Nekter.png", name: "Nékter Juice Bar", color: "#8BC34A" },
  { file: "AmericanCareerCollegelogo.png", name: "American Career College", color: "#3F51B5" },
  { file: "Toshiba_Alt.png", name: "Toshiba", color: "#1976D2" },
  { file: "WCU.png", name: "West Coast University", color: "#673AB7" },
  { file: "Chapman-Logo.png", name: "Chapman University", color: "#FF9800" },
  { file: "Knotts_Logo.png", name: "Knott's Berry Farm", color: "#795548" },
  { file: "Oakwood.png", name: "Oakwood", color: "#607D8B" },
  { file: "LumeCube.png", name: "Lume Cube", color: "#009688" },
  { file: "betteru_logo.png", name: "betterU", color: "#00BCD4" },
  { file: "Orangewood.png", name: "Orangewood", color: "#FF7043" },
  { file: "MarcPro.png", name: "Marc Pro", color: "#4CAF50" },
  { file: "tenet.png", name: "Tenet Healthcare", color: "#2196F3" },
  { file: "OluKai_Logo.png", name: "OluKai", color: "#8D6E63" },
  { file: "GFORE_Logo.png", name: "G/FORE", color: "#FFC107" },
  { file: "Northgate_Logo.png", name: "Northgate Market", color: "#4CAF50" },
];

// Crosshair component for grid intersections
const Crosshair = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute w-4 h-4 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 0.6, 0.6, 0]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4 + 3,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/40 transform -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-foreground/40 transform -translate-x-1/2" />
      </div>
    </motion.div>
  );
};

export default function BrandsGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [crosshairs, setCrosshairs] = useState<Array<{ id: number; row: number; col: number; delay: number }>>([]);

  // Calculate grid dimensions
  const cols = 6; // lg:grid-cols-6
  const rows = Math.ceil(brands.length / cols);

  // Helper function to get adjacent cell indices with direction info
  const getAdjacentCells = (index: number) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const adjacent = [];

    // Top
    if (row > 0) adjacent.push({ index: index - cols, direction: 'top' });
    // Bottom
    if (row < rows - 1) adjacent.push({ index: index + cols, direction: 'bottom' });
    // Left
    if (col > 0) adjacent.push({ index: index - 1, direction: 'left' });
    // Right
    if (col < cols - 1) adjacent.push({ index: index + 1, direction: 'right' });
    // Top-left
    if (row > 0 && col > 0) adjacent.push({ index: index - cols - 1, direction: 'top-left' });
    // Top-right
    if (row > 0 && col < cols - 1) adjacent.push({ index: index - cols + 1, direction: 'top-right' });
    // Bottom-left
    if (row < rows - 1 && col > 0) adjacent.push({ index: index + cols - 1, direction: 'bottom-left' });
    // Bottom-right
    if (row < rows - 1 && col < cols - 1) adjacent.push({ index: index + cols + 1, direction: 'bottom-right' });

    return adjacent.filter(item => item.index >= 0 && item.index < brands.length);
  };

  // Helper function to get which border should animate for an adjacent cell
  const getBorderDirection = (hoveredIndex: number, adjacentIndex: number) => {
    const hoveredRow = Math.floor(hoveredIndex / cols);
    const hoveredCol = hoveredIndex % cols;
    const adjacentRow = Math.floor(adjacentIndex / cols);
    const adjacentCol = adjacentIndex % cols;

    // Determine which border of the adjacent cell should animate
    if (adjacentRow < hoveredRow && adjacentCol === hoveredCol) return 'bottom'; // Adjacent is above
    if (adjacentRow > hoveredRow && adjacentCol === hoveredCol) return 'top'; // Adjacent is below
    if (adjacentRow === hoveredRow && adjacentCol < hoveredCol) return 'right'; // Adjacent is left
    if (adjacentRow === hoveredRow && adjacentCol > hoveredCol) return 'left'; // Adjacent is right
    if (adjacentRow < hoveredRow && adjacentCol < hoveredCol) return 'bottom-right'; // Adjacent is top-left
    if (adjacentRow < hoveredRow && adjacentCol > hoveredCol) return 'bottom-left'; // Adjacent is top-right
    if (adjacentRow > hoveredRow && adjacentCol < hoveredCol) return 'top-right'; // Adjacent is bottom-left
    if (adjacentRow > hoveredRow && adjacentCol > hoveredCol) return 'top-left'; // Adjacent is bottom-right
    
    return null;
  };

  // Generate crosshair positions at grid intersections
  useEffect(() => {
    const crosshairPositions: Array<{ id: number; row: number; col: number; delay: number }> = [];
    let id = 0;
    
    // Create crosshairs at specific intersections (corners of grid cells)
    // Only create a subset to avoid overcrowding
    const intersectionPoints = [
      { row: 0, col: 2 }, // Top middle
      { row: 1, col: 0 }, // Left side
      { row: 1, col: 4 }, // Right side  
      { row: 2, col: 1 }, // Bottom left
      { row: 2, col: 3 }, // Bottom middle
      { row: 0, col: 5 }, // Top right
      { row: 1, col: 2 }, // Center
      { row: 2, col: 5 }, // Bottom right
    ];
    
    intersectionPoints.forEach((point, index) => {
      if (point.row <= rows && point.col <= cols) {
        crosshairPositions.push({
          id: id++,
          row: point.row,
          col: point.col,
          delay: index * 0.5 + Math.random() * 2
        });
      }
    });
    
    setCrosshairs(crosshairPositions);
  }, [rows, cols]);

  return (
    <section className="w-full py-10 bg-background">
      <div className="container mx-auto px-4 pl-20 md:pl-24">
        <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Brands</h2>
        
        {/* Grid container with relative positioning for crosshairs */}
        <div className="relative">
          {/* Logo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0 border border-border/30 relative">
            {/* Crosshairs at grid intersections */}
            {crosshairs.map((crosshair) => (
              <div
                key={crosshair.id}
                className="absolute pointer-events-none z-30"
                style={{
                  left: `calc(${(crosshair.col / cols) * 100}% - 7px)`,
                  top: `calc(${(crosshair.row / rows) * 100}% - 7px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Crosshair delay={crosshair.delay} />
              </div>
            ))}
            
            {/* Logo cells */}
            {brands.map((brand, index) => {
              const isHovered = hoveredIndex === index;
              const adjacentCells = hoveredIndex !== null ? getAdjacentCells(hoveredIndex) : [];
              const adjacentCell = adjacentCells.find(cell => cell.index === index);
              const isAdjacent = adjacentCell !== undefined;
              const borderDirection = hoveredIndex !== null && isAdjacent ? getBorderDirection(hoveredIndex, index) : null;
              
              return (
                <motion.div
                  key={brand.file}
                  className="relative aspect-square border border-border/30 flex items-center justify-center p-6 cursor-pointer overflow-hidden group"
                  style={{
                    backgroundColor: isHovered ? '#96442e15' : 'transparent',
                    borderColor: isHovered ? '#96442e' : undefined,
                    borderWidth: isHovered ? '2px' : '1px',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >

                  
                  {/* Directional border animation for adjacent cells */}
                  {isAdjacent && borderDirection && (
                    <>
                      {/* Top border - draws upward from hovered cell, full color at connection */}
                      {borderDirection === 'top' && (
                        <motion.div
                          className="absolute top-0 left-1/2 h-px z-10"
                          style={{
                            background: 'linear-gradient(to left, #96442e, rgba(150, 68, 46, 0))'
                          }}
                          initial={{ width: 0, x: '0%', transformOrigin: 'left' }}
                          animate={{ width: '50%', x: '0%' }}
                          exit={{ width: 0, x: '0%' }}
                          transition={{ 
                            duration: 0.25, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            delay: 0.05 
                          }}
                        />
                      )}
                      
                      {/* Bottom border - draws downward from hovered cell, full color at connection */}
                      {borderDirection === 'bottom' && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 h-px z-10"
                          style={{
                            background: 'linear-gradient(to right, #96442e, rgba(150, 68, 46, 0))'
                          }}
                          initial={{ width: 0, x: '-50%', transformOrigin: 'right' }}
                          animate={{ width: '50%', x: '-50%' }}
                          exit={{ width: 0, x: '-50%' }}
                          transition={{ 
                            duration: 0.25, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            delay: 0.05 
                          }}
                        />
                      )}
                      
                      {/* Left border - draws leftward from hovered cell, full color at connection */}
                      {borderDirection === 'left' && (
                        <motion.div
                          className="absolute left-0 top-1/2 w-px z-10"
                          style={{
                            background: 'linear-gradient(to top, #96442e, rgba(150, 68, 46, 0))'
                          }}
                          initial={{ height: 0, y: '0%', transformOrigin: 'top' }}
                          animate={{ height: '50%', y: '0%' }}
                          exit={{ height: 0, y: '0%' }}
                          transition={{ 
                            duration: 0.25, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            delay: 0.05 
                          }}
                        />
                      )}
                      
                      {/* Right border - draws rightward from hovered cell, full color at connection */}
                      {borderDirection === 'right' && (
                        <motion.div
                          className="absolute right-0 top-1/2 w-px z-10"
                          style={{
                            background: 'linear-gradient(to bottom, #96442e, rgba(150, 68, 46, 0))'
                          }}
                          initial={{ height: 0, y: '-50%', transformOrigin: 'bottom' }}
                          animate={{ height: '50%', y: '-50%' }}
                          exit={{ height: 0, y: '-50%' }}
                          transition={{ 
                            duration: 0.25, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            delay: 0.05 
                          }}
                        />
                      )}
                      
                      {/* Corner borders for diagonal adjacency - draw outward from connection */}
                      {borderDirection === 'bottom-right' && (
                        <>
                          {/* Bottom border - connects to hovered cell above, full color at connection */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 h-px z-10"
                            style={{
                              background: 'linear-gradient(to left, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ width: 0, x: '0%', transformOrigin: 'left' }}
                            animate={{ width: '50%', x: '0%' }}
                            exit={{ width: 0, x: '0%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.05 
                            }}
                          />
                          {/* Right border - connects to hovered cell to the left, full color at connection */}
                          <motion.div
                            className="absolute right-0 top-1/2 w-px z-10"
                            style={{
                              background: 'linear-gradient(to top, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ height: 0, y: '0%', transformOrigin: 'top' }}
                            animate={{ height: '50%', y: '0%' }}
                            exit={{ height: 0, y: '0%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.1 
                            }}
                          />
                        </>
                      )}
                      
                      {borderDirection === 'bottom-left' && (
                        <>
                          {/* Bottom border - connects to hovered cell above, full color at connection */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 h-px z-10"
                            style={{
                              background: 'linear-gradient(to right, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ width: 0, x: '-50%', transformOrigin: 'right' }}
                            animate={{ width: '50%', x: '-50%' }}
                            exit={{ width: 0, x: '-50%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.05 
                            }}
                          />
                          {/* Left border - connects to hovered cell to the right, full color at connection */}
                          <motion.div
                            className="absolute left-0 top-1/2 w-px z-10"
                            style={{
                              background: 'linear-gradient(to top, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ height: 0, y: '0%', transformOrigin: 'top' }}
                            animate={{ height: '50%', y: '0%' }}
                            exit={{ height: 0, y: '0%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.1 
                            }}
                          />
                        </>
                      )}
                      
                      {borderDirection === 'top-right' && (
                        <>
                          {/* Top border - connects to hovered cell below, full color at connection */}
                          <motion.div
                            className="absolute top-0 left-1/2 h-px z-10"
                            style={{
                              background: 'linear-gradient(to left, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ width: 0, x: '0%', transformOrigin: 'left' }}
                            animate={{ width: '50%', x: '0%' }}
                            exit={{ width: 0, x: '0%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.05 
                            }}
                          />
                          {/* Right border - connects to hovered cell to the left, full color at connection */}
                          <motion.div
                            className="absolute right-0 top-1/2 w-px z-10"
                            style={{
                              background: 'linear-gradient(to bottom, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ height: 0, y: '-50%', transformOrigin: 'bottom' }}
                            animate={{ height: '50%', y: '-50%' }}
                            exit={{ height: 0, y: '-50%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.1 
                            }}
                          />
                        </>
                      )}
                      
                      {borderDirection === 'top-left' && (
                        <>
                          {/* Top border - connects to hovered cell below, full color at connection */}
                          <motion.div
                            className="absolute top-0 left-1/2 h-px z-10"
                            style={{
                              background: 'linear-gradient(to right, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ width: 0, x: '-50%', transformOrigin: 'right' }}
                            animate={{ width: '50%', x: '-50%' }}
                            exit={{ width: 0, x: '-50%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.05 
                            }}
                          />
                          {/* Left border - connects to hovered cell to the right, full color at connection */}
                          <motion.div
                            className="absolute left-0 top-1/2 w-px z-10"
                            style={{
                              background: 'linear-gradient(to bottom, #96442e, rgba(150, 68, 46, 0))'
                            }}
                            initial={{ height: 0, y: '-50%', transformOrigin: 'bottom' }}
                            animate={{ height: '50%', y: '-50%' }}
                            exit={{ height: 0, y: '-50%' }}
                            transition={{ 
                              duration: 0.25, 
                              ease: [0.25, 0.46, 0.45, 0.94],
                              delay: 0.1 
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                  
                  {/* Logo with mix-blend-mode for theme adaptation */}
                  <Image
                    src={`/brands/${brand.file}`}
                    alt={brand.name}
                    width={120}
                    height={80}
                    className="object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 mix-blend-difference filter contrast-200"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                  
                  {/* Subtle glow effect on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, #96442e10 0%, transparent 70%)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
