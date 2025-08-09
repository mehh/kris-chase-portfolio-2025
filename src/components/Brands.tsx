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
              
              return (
                <motion.div
                  key={brand.file}
                  className="relative aspect-square border border-border/30 flex items-center justify-center p-6 cursor-pointer overflow-hidden group"
                  style={{
                    backgroundColor: isHovered ? '#FFC10715' : 'transparent',
                    borderColor: isHovered ? '#FFC107' : undefined,
                    borderWidth: isHovered ? '2px' : '1px',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Hover border effect extending to adjacent cells */}
                  {isHovered && (
                    <>
                      {/* Top border extension */}
                      <motion.div
                        className="absolute -top-px left-1/2 w-1/2 h-px z-20"
                        style={{ backgroundColor: '#FFC107' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                      {/* Right border extension */}
                      <motion.div
                        className="absolute -right-px top-1/2 w-px h-1/2 z-20"
                        style={{ backgroundColor: '#FFC107' }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                      {/* Bottom border extension */}
                      <motion.div
                        className="absolute -bottom-px left-1/2 w-1/2 h-px z-20"
                        style={{ backgroundColor: '#FFC107' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                      {/* Left border extension */}
                      <motion.div
                        className="absolute -left-px top-1/2 w-px h-1/2 z-20"
                        style={{ backgroundColor: '#FFC107' }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
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
                        background: `radial-gradient(circle at center, #FFC10710 0%, transparent 70%)`,
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
