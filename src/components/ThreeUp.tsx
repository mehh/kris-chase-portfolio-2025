"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

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
                    <Image
                      src="/images/g_website.045.jpg"
                      alt="Plan your mission, goals and objectives"
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </a>
              </div>
              <div className="title text-2xl font-heading uppercase mb-2 text-secondary-foreground">
                Plan your mission, goals and objectives
              </div>
            </div>

            <div className="grid-item">
              <div className="plane-wrapper mb-4">
                <a href="https://krischase.com" className="plane-inner block">
                  <div className="hover-plane image relative overflow-hidden rounded-lg">
                    <Image
                      src="/images/g_website.209.jpg"
                      alt="Analyze industry positioning"
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </a>
              </div>
              <div className="title text-2xl font-heading uppercase mb-2 text-secondary-foreground">
                Analyze industry positioning
              </div>
            </div>

            <div className="grid-item">
              <div className="plane-wrapper mb-4">
                <a href="https://krischase.com" className="plane-inner block">
                  <div className="hover-plane image relative overflow-hidden rounded-lg">
                    <Image
                      src="/images/g_website.203.jpg"
                      alt="Evaluate, modify, repeat"
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </a>
              </div>
              <div className="title text-2xl font-heading uppercase mb-2 text-secondary-foreground">
                Evaluate, modify, repeat
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
