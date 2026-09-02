"use client";

import { Children } from "react";
import { motion, type Variants } from "motion/react";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_EMPHASIZED_DECELERATE },
  },
};

export default function HeroIntro({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex flex-col items-start gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
