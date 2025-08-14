"use client";

import { motion, Transition } from "framer-motion";
import { useMemo } from "react";

interface VerticalCutRevealProps {
  children: string;
  splitBy?: "characters" | "words" | "lines";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  reverse?: boolean;
  transition?: Transition;
  className?: string;
  inViewOnScroll?: boolean;
  viewportOnce?: boolean;
  viewportAmount?: number;
  viewportMargin?: string;
}

export default function VerticalCutReveal({
  children,
  splitBy = "characters",
  staggerDuration = 0.025,
  staggerFrom = "first",
  reverse = false,
  transition = {
    type: "spring",
    stiffness: 200,
    damping: 21,
  },
  className = "",
  inViewOnScroll = true,
  viewportOnce = true,
  viewportAmount = 0.2,
  viewportMargin = "0px 0px -10% 0px",
}: VerticalCutRevealProps) {
  const elements = useMemo(() => {
    let parts: string[] = [];
    
    switch (splitBy) {
      case "characters":
        parts = children.split("");
        break;
      case "words":
        parts = children.split(" ");
        break;
      case "lines":
        parts = children.split("\n");
        break;
      default:
        parts = children.split("");
    }
    
    return parts;
  }, [children, splitBy]);

  const getDelay = (index: number) => {
    const totalElements = elements.length;
    let delayIndex = index;
    
    switch (staggerFrom) {
      case "last":
        delayIndex = totalElements - 1 - index;
        break;
      case "center":
        const center = Math.floor(totalElements / 2);
        delayIndex = Math.abs(index - center);
        break;
      default:
        delayIndex = index;
    }
    
    return reverse ? (totalElements - 1 - delayIndex) * staggerDuration : delayIndex * staggerDuration;
  };

  return (
    <span className={className}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={{
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
          }}
          {...(inViewOnScroll
            ? {
                whileInView: {
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 1,
                },
                viewport: { once: viewportOnce, amount: viewportAmount, margin: viewportMargin },
              }
            : {
                animate: {
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 1,
                },
              })}
          transition={{
            ...transition,
            delay: (transition.delay || 0) + getDelay(index),
          }}
          style={{ display: "inline-block", whiteSpace: splitBy === "words" ? "nowrap" : "normal" }}
        >
          {element === " " ? "\u00A0" : element}
          {splitBy === "words" && index < elements.length - 1 && "\u00A0"}
          {splitBy === "lines" && index < elements.length - 1 && <br />}
        </motion.span>
      ))}
    </span>
  );
}
