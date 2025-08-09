"use client";

import React, { useEffect, useState } from "react";
import TattooPatterns from "./TattooPatterns";

export default function Hero() {
  const [randomText1, setRandomText1] = useState("ENGINEER");
  const [randomText2, setRandomText2] = useState("TEAMS");

  useEffect(() => {
    const words1 = ["BUILD", "CREATE", "ENGINEER"];
    const words2 = ["WEBSITES", "PROCESSES", "TEAMS", "APPS", "MEMORIES", "IOT", "CONNECTIONS"];

    const generateRandomText = (words: string[], setter: (text: string) => void) => {
      const word = words[Math.floor(Math.random() * words.length)];
      setter(word);
    };

    const randomizeText = (words: string[], setter: (text: string) => void) => {
      setTimeout(() => generateRandomText(words, setter), 150);
      setTimeout(() => generateRandomText(words, setter), 300);
      setTimeout(() => generateRandomText(words, setter), 450);
    };

    // Set up intervals for both text elements
    const interval1 = setInterval(() => {
      randomizeText(words1, setRandomText1);
    }, Math.floor(Math.random() * 4 + 2) * 1000); // Random between 2-5 seconds

    const interval2 = setInterval(() => {
      randomizeText(words2, setRandomText2);
    }, Math.floor(Math.random() * 4 + 2) * 1000); // Random between 2-5 seconds

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <section className="home min-h-screen relative overflow-hidden">
      {/* Tattoo Patterns Background - Full Screen */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <div className="hover-plane w-full h-full">
          <TattooPatterns />
        </div>
      </div>
      
      {/* Text Content - Centered Over Background */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 pl-20 md:pl-24">
          <h1 className="h-main-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold font-heading leading-[0.85] tracking-tight text-center text-white drop-shadow-2xl">
            I AM <br />
            KRIS CHASE <br />
            I <span className="text-primary transition-all duration-300">{randomText1}</span> <br />
            <span className="text-accent transition-all duration-300">{randomText2}</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
