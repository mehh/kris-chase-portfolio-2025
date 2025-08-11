"use client";

import React, { useEffect, useRef } from "react";

export default function Saver() {
  const saverRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const show = (elem: HTMLElement | null) => {
      if (elem) elem.style.display = 'block';
    };

    const hide = (elem: HTMLElement | null) => {
      if (elem) elem.style.display = 'none';
    };

    const checkState = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        startSaver();
      }, 30 * 1000); // 30 seconds of inactivity
      
      // Hide screensaver and clear canvas
      const saverElement = saverRef.current;
      if (saverElement) {
        hide(saverElement);
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      }
      
      // Cancel animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    const startSaver = () => {
      const saverElement = saverRef.current;
      const canvas = canvasRef.current;
      
      if (!saverElement || !canvas) return;
      
      show(saverElement);
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set font styles based on screen size
      const fontSize = window.innerWidth > 1000 ? 150 : 50;
      const font = `bold ${fontSize}px 'Chakra Petch', Helvetica, Arial, sans-serif`;
      
      const text = "Kris Chase";
      const speed = 10;
      
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const textHeight = fontSize;
      
      // Set canvas dimensions
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      // Initial position and direction
      const position = {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight
      };
      
      let directionX = 1;
      let directionY = 1;
      
      // Setup canvas context
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.lineWidth = 3; // Increased thickness for better visibility
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const textWidth = Math.ceil(ctx.measureText(text).width);
      
      // Trail system - keep track of last X positions
      const maxTrailLength = 15; // Number of trail positions to keep
      const trailPositions: Array<{ x: number; y: number; color: string }> = [];
      
      const drawText = (context: CanvasRenderingContext2D, pos: { x: number; y: number }) => {
        // Clear the entire canvas
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Add current position to trail
        const currentColor = getRandomColor();
        trailPositions.push({ x: pos.x, y: pos.y, color: currentColor });
        
        // Keep only the last maxTrailLength positions
        if (trailPositions.length > maxTrailLength) {
          trailPositions.shift();
        }
        
        // Draw trail positions first (outline only, thinner)
        trailPositions.slice(0, -1).forEach((trailPos) => {
          context.shadowBlur = 0;
          context.lineWidth = 2; // Thinner for trail
          context.strokeStyle = trailPos.color;
          context.strokeText(text, trailPos.x, trailPos.y);
        });
        
        // Draw current position on top (thicker, with glow)
        if (trailPositions.length > 0) {
          const currentPos = trailPositions[trailPositions.length - 1];
          
          // Enhanced glow effect for current position
          context.shadowColor = currentPos.color;
          context.shadowBlur = 10;
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          
          // Thicker outline for current position
          context.lineWidth = 4;
          context.strokeStyle = currentPos.color;
          context.strokeText(text, currentPos.x, currentPos.y);
        }
        
        // Reset shadow and line width for next frame
        context.shadowBlur = 0;
        context.lineWidth = 3;
      };
      
      let lastTime = Date.now();
      
      const getRandomColor = () => {
        const colors = ['#96442e', '#b8553a', '#8a3d28', '#d4654c'];
        return colors[Math.floor(Math.random() * colors.length)];
      };
      
      const updatePosition = () => {
        const color = getRandomColor();
        ctx.strokeStyle = color;
        ctx.fillStyle = 'transparent'; // No fill, outline only
        
        // Bounce off walls
        if (position.x + textWidth >= canvasWidth) {
          directionX = -1;
          position.x = canvasWidth - (position.x + textWidth - canvasWidth) - textWidth;
        } else if (position.x <= 0) {
          directionX = 1;
          position.x = -position.x;
        }
        
        if (position.y + textHeight >= canvasHeight) {
          directionY = -1;
          position.y = canvasHeight - (position.y + textHeight - canvasHeight) - textHeight;
        } else if (position.y <= 0) {
          directionY = 1;
          position.y = -position.y;
        }
      };
      
      const animate = () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > 25) { // ~40fps
          position.x += speed * directionX;
          position.y += speed * directionY;
          
          updatePosition();
          drawText(ctx, position);
          
          lastTime = currentTime;
        }
        
        rafRef.current = requestAnimationFrame(animate);
      };
      
      rafRef.current = requestAnimationFrame(animate);
    };

    // Add event listeners
    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, checkState, false);
    });

    // Start initial timeout
    checkState();

    // Cleanup
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, checkState, false);
      });
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={saverRef}
      id="saver" 
      className="fixed inset-0 z-[99999] bg-black"
      style={{ display: 'none' }}
    >
      <canvas 
        ref={canvasRef}
        id="can" 
        className="w-full h-full"
      />
    </div>
  );
}
