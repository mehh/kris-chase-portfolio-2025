"use client";

import { motion, Transition } from "framer-motion";
import { useMemo, Fragment } from "react";

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
  staggerFrom: _staggerFrom = "first",
  reverse: _reverse = false,
  transition = {
    type: "spring",
    stiffness: 200,
    damping: 21,
  },
  className = "",
  inViewOnScroll = true,
  viewportOnce = true,
  viewportAmount = 0.15,
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

  // Silence unused props while keeping API surface stable
  void _staggerFrom;
  void _reverse;

  // Parent-controlled in-view with staggered children variants for robustness
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDuration > 0 ? staggerDuration : 0.01,
      },
    },
  } as const;

  const itemVariants = {
    hidden: {
      clipPath: "inset(100% 0% 0% 0%)",
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
    },
  } as const;

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      {...(inViewOnScroll
        ? {
            whileInView: "visible" as const,
            viewport: { once: viewportOnce, amount: viewportAmount, margin: viewportMargin },
          }
        : { animate: "visible" as const })}
      style={{ display: "block", width: "fit-content" }}
    >
      {elements.map((element, index) => (
        <Fragment key={`frag-${index}`}>
          <motion.span
            variants={itemVariants}
            transition={transition}
            style={{ display: "inline-block", whiteSpace: "normal" }}
          >
            {splitBy === "words" ? element : element === " " ? "\u00A0" : element}
            {splitBy === "lines" && index < elements.length - 1 && <br />}
          </motion.span>
          {splitBy === "words" && index < elements.length - 1 && " "}
        </Fragment>
      ))}
    </motion.div>
  );
}
