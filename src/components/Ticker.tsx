"use client";

import { useEffect, useRef, useState } from 'react';
import { useMachineSlice } from "@/components/machine/MachineViewProvider";

interface TickerProps {
  items?: string[];
  className?: string;
  textSize?: string;
}

export default function Ticker({ 
  items = ["Startups", "Platforms", "Leadership", "Architecture", "CI/CD", "Teams", "Strategy", "Innovation", "Scale", "Delivery"],
  className = '',
  textSize = 'text-2xl md:text-3xl lg:text-4xl'
}: TickerProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for down, -1 for up
  const lastScrollY = useRef(0);
  const animationId = useRef<number | null>(null);
  const translateX = useRef(0);

  // Register Ticker items for Machine View
  useMachineSlice({
    type: "section",
    title: "Ticker",
    path: "/",
    order: 22,
    content: [
      "### Ticker Items",
      ...items.map((i) => `- ${i}`),
    ].join("\n"),
  }, []);

  useEffect(() => {
    let ticking = false;
    let currentSpeed = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const deltaY = currentScrollY - lastScrollY.current;
          
          // Calculate scroll speed (0-10 range)
          const speed = Math.min(Math.abs(deltaY) * 0.8, 10);
          setScrollSpeed(speed);
          
          // Set direction based on scroll direction
          if (deltaY !== 0) {
            setScrollDirection(deltaY > 0 ? 1 : -1);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Animate the marquee
    const animate = () => {
      if (marqueeRef.current) {
        // Smoothly interpolate to target scroll speed
        const targetSpeed = scrollSpeed;
        currentSpeed += (targetSpeed - currentSpeed) * 0.1;
        
        // Always maintain minimum base speed
        const baseSpeed = 1.0;
        const scrollMultiplier = 1 + (currentSpeed * 0.4);
        const direction = scrollDirection;
        
        translateX.current += (baseSpeed * scrollMultiplier * direction);
        
        // Reset position when it goes too far
        const marqueeWidth = marqueeRef.current.scrollWidth / 2;
        if (Math.abs(translateX.current) >= marqueeWidth) {
          translateX.current = 0;
        }
        
        marqueeRef.current.style.transform = `translateX(${-translateX.current}px)`;
        
        // Gradually reduce scroll speed when not scrolling
        if (currentSpeed > 0) {
          setScrollSpeed(prev => Math.max(0, prev * 0.95));
        }
      }
      
      animationId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationId.current = requestAnimationFrame(animate);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [scrollSpeed, scrollDirection]);

  // Create the marquee content (duplicate for seamless loop)
  const createMarqueeContent = () => {
    return items.map((item, index) => (
      <span 
        key={index}
        className={`marquee_item flex items-center ${textSize} uppercase font-heading whitespace-nowrap`}
      >
        <span className="mx-8">-</span>
        <span className="mx-8">{item}</span>
      </span>
    ));
  };

  return (
    <div className={`ticker py-3 sm:py-4 overflow-hidden ${className}`}>
      <div className="marquee flex">
        <div 
          ref={marqueeRef}
          className="marquee_content flex"
          style={{ willChange: 'transform' }}
        >
          {/* First set */}
          <div className="marquee_list flex">
            {createMarqueeContent()}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="marquee_list flex">
            {createMarqueeContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
