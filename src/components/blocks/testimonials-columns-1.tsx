"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "motion/react";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      translateY: ["0%", "-50%"],
      transition: {
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls, props.duration]);

  const handleEnter = () => controls.stop();
  const handleLeave = () =>
    controls.start({
      translateY: ["0%", "-50%"],
      transition: {
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
      },
    });

  return (
    <div className={props.className}>
      <motion.div
        animate={controls}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg max-w-xs w-full hover:border-[#96442e]/30 transition-all duration-300" key={i}>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-6">{text}</div>
                  <div className="flex items-center gap-3 mt-5">
                    <Image
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border-2 border-[#96442e]/20 object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold tracking-tight leading-5 text-black dark:text-white">{name}</div>
                      <div className="leading-5 text-gray-500 dark:text-gray-400 tracking-tight text-xs">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

;