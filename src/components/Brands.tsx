"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

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
  const [previousHoveredIndex, setPreviousHoveredIndex] = useState<number | null>(null);
  const [crosshairs, setCrosshairs] = useState<Array<{ id: number; row: number; col: number; delay: number }>>([]);

  // Calculate grid dimensions
  const cols = 6; // lg:grid-cols-6
  const rows = Math.ceil(brands.length / cols);

  // Register Brands for Machine View
  useMachineSlice({
    type: "section",
    title: "Brands",
    path: "/",
    order: 50,
    content: [
      "### Brand List",
      ...brands.map((b) => `- ${b.name}`),
    ].join("\n"),
  }, []);

  const handleMouseEnter = (index: number) => {
    setPreviousHoveredIndex(hoveredIndex);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setPreviousHoveredIndex(hoveredIndex);
    setHoveredIndex(null);
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
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:pl-8 md:pl-12">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-4 sm:mb-6">Brands</h2>
        
        {/* Grid container with relative positioning for crosshairs */}
        <div className="relative">
          {/* Logo grid */}
          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0 border border-border/30 relative">
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
              const wasPreviouslyHovered = previousHoveredIndex === index;

              return (
                <motion.div
                  key={brand.name}
                  className="relative aspect-square border border-border/30 flex items-center justify-center p-3 sm:p-4 md:p-6 cursor-pointer overflow-hidden group"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  animate={{
                    borderColor: isHovered ? '#96442e' : wasPreviouslyHovered && !isHovered ? ['#96442e', '#96442e80', '#96442e40', '#ffffff20'] : '#ffffff20',
                    borderWidth: isHovered ? '2px' : '1px',
                    scale: isHovered ? 1.02 : 1
                  }}
                  transition={{
                    borderColor: { 
                      duration: wasPreviouslyHovered && !isHovered ? 1.5 : 0.2,
                      ease: "easeOut"
                    },
                    borderWidth: { duration: 0.2 },
                    scale: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  {/* Enhanced border glow effect for hovered item */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        boxShadow: '0 0 20px rgba(150, 68, 46, 0.3), inset 0 0 20px rgba(150, 68, 46, 0.1)'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
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
