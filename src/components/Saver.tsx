"use client";

import React, { useEffect } from "react";

export default function Saver() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let animationFrame: number;

    const show = (elem: HTMLElement) => {
      elem.style.display = 'block';
    };

    const hide = (elem: HTMLElement) => {
      elem.style.display = 'none';
    };

    const checkState = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        saver('delay');
      }, 1000000); // 1000 seconds for demo (was 2 minutes)
      
      const saverElement = document.getElementById('saver');
      if (saverElement) {
        hide(saverElement);
        saverElement.innerHTML = '';
      }
    };

    const saver = (type: string) => {
      if (type !== 'delay') return;

      const saverElement = document.getElementById('saver');
      if (!saverElement) return;

      show(saverElement);
      saverElement.innerHTML = '<canvas id="can"></canvas>';

      const canvas = document.getElementById("can") as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set font styles
      const fontSize = window.innerWidth > 1000 ? "bold 150px" : "bold 50px";
      const fontFamily = "'Chakra Petch', Helvetica, Arial, sans-serif";
      const font = `${fontSize} ${fontFamily}`;

      const text = "Kris Chase";
      const speed = 10;
      
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const textHeight = 100;
      
      let position = {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight
      };
      
      let direction = { x: 1, y: 1 };
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      ctx.font = font;
      ctx.textBaseline = "top";
      ctx.lineWidth = 1;
      
      const textWidth = Math.ceil(ctx.measureText(text).width);
      
      const drawText = (context: CanvasRenderingContext2D, pos: { x: number; y: number }) => {
        context.fillText(text, pos.x, pos.y);
        context.strokeText(text, pos.x, pos.y);
      };
      
      let lastTime = Date.now();
      
      const getRandomColor = () => {
        const colors = ['green', 'yellow', 'blue', 'red', 'purple', 'orange'];
        return colors[Math.floor(Math.random() * colors.length)];
      };
      
      const updatePosition = () => {
        const color = getRandomColor();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        
        // Bounce off walls
        if (position.x + textWidth >= canvasWidth) {
          direction.x = -1;
          position.x = canvasWidth - (position.x + textWidth - canvasWidth) - textWidth;
        } else if (position.x <= 0) {
          direction.x = 1;
          position.x = -position.x;
        }
        
        if (position.y + textHeight >= canvasHeight) {
          direction.y = -1;
          position.y = canvasHeight - (position.y + textHeight - canvasHeight) - textHeight;
        } else if (position.y <= 0) {
          direction.y = 1;
          position.y = -position.y;
        }
      };
      
      const animate = () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        
        if (deltaTime > 25) {
          position.x += speed * direction.x;
          position.y += speed * direction.y;
          updatePosition();
          drawText(ctx, position);
          lastTime = currentTime;
        }
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animationFrame = requestAnimationFrame(animate);
    };

    // Event listeners
    window.addEventListener('mousemove', checkState, false);
    window.addEventListener('keydown', checkState, false);
    window.addEventListener('click', checkState, false);
    window.addEventListener('touchstart', checkState, false);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('mousemove', checkState, false);
      window.removeEventListener('keydown', checkState, false);
      window.removeEventListener('click', checkState, false);
      window.removeEventListener('touchstart', checkState, false);
    };
  }, []);

  return (
    <div 
      id="saver" 
      className="fixed inset-0 z-[10000] bg-black"
      style={{ display: 'none' }}
    >
      <canvas id="can" />
    </div>
  );
}
