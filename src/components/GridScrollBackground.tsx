"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";

/**
 * Global background that animates two vertical grid images from the sides
 * as the user scrolls.
 *
 * Assets expected at:
 *  - /public/images/LeftGrid.webp
 *  - /public/images/RightGrid.webp
 */
export default function GridScrollBackground() {
  // Global scroll progress [0..1]
  const { scrollYProgress } = useScroll();

  // Animate opacity early for immediate visibility

  // Opacity ramps quickly then holds
  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0.35, 1, 1]);

  // Linear translate across the whole page for consistent speed
  const leftTransform = useTransform(scrollYProgress, [0, 1], [
    "translateX(-60%)",
    "translateX(10%)",
  ]);

  const rightTransform = useTransform(scrollYProgress, [0, 1], [
    "translateX(60%)",
    "translateX(-10%)",
  ]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-x-clip md:block hidden"
      aria-hidden
    >
      {/* Left grid */}
      <motion.div
        className="absolute top-0 left-0 h-screen"
        style={{ transform: leftTransform, opacity }}
      >
        <Image
          src="/images/LeftGrid.webp"
          alt=""
          width={800}
          height={1600}
          className="h-screen w-auto select-none filter grayscale brightness-90 contrast-125"
          priority
        />
      </motion.div>

      {/* Right grid */}
      <motion.div
        className="absolute top-0 right-0 h-screen"
        style={{ transform: rightTransform, opacity }}
      >
        <Image
          src="/images/RightGrid.webp"
          alt=""
          width={800}
          height={1600}
          className="h-screen w-auto select-none filter grayscale brightness-90 contrast-125"
          priority
        />
      </motion.div>
    </div>
  );
}
