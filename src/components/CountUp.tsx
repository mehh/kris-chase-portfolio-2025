"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export type CountUpProps = {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number; // seconds
  duration?: number; // seconds
  className?: string;
  startWhen?: boolean;
  separator?: string; // e.g. ","
  onStart?: () => void;
  onEnd?: () => void;
};

function getDecimalPlaces(num: number) {
  const str = num.toString();
  if (str.includes(".")) {
    const decimals = str.split(".")[1];
    if (parseInt(decimals) !== 0) return decimals.length;
  }
  return 0;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === "down" ? to : from);
    }
  }, [from, to, direction]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") onStart();

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(() => {
        if (typeof onEnd === "function") onEnd();
      }, delay * 1000 + duration * 1000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const hasDecimals = maxDecimals > 0;
        const options: Intl.NumberFormatOptions = {
          useGrouping: !!separator,
          minimumFractionDigits: hasDecimals ? maxDecimals : 0,
          maximumFractionDigits: hasDecimals ? maxDecimals : 0,
        };
        const formattedNumber = new Intl.NumberFormat("en-US", options).format(latest as number);
        ref.current.textContent = separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
      }
    });
    return () => unsubscribe();
  }, [springValue, separator, maxDecimals]);

  return <span className={className} ref={ref} />;
}
