"use client";

import { motion } from "motion/react";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

// No product photography exists in this project — this is a deliberate
// icon-mosaic graphic, not a placeholder standing in for a missing photo.
// Uniform 32px icons: Material Symbols' static (non-variable) subset is
// drawn for ~24px strokes, and scaling far past that reads as sparse
// wireframe shapes rather than bold ones — so tiles stay uniform and modest
// rather than mixing in a blown-up "hero" tile.
const TILES = ["sports_soccer", "directions_run", "sports_basketball", "sports_tennis", "sports_volleyball", "checkroom"] as const;

export default function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="hidden aspect-[3/2] w-full max-w-md grid-cols-3 grid-rows-2 gap-3 sm:grid"
    >
      {TILES.map((icon, i) => (
        <motion.div
          key={icon}
          className="flex items-center justify-center rounded-3xl"
          style={{
            background:
              i % 2 === 0
                ? "var(--md-sys-color-primary-container)"
                : "var(--md-sys-color-tertiary-container)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1 + i * 0.06,
            ease: EASE_EMPHASIZED_DECELERATE,
          }}
        >
          <md-icon
            style={{
              fontSize: "32px",
              color:
                i % 2 === 0
                  ? "var(--md-sys-color-on-primary-container)"
                  : "var(--md-sys-color-on-tertiary-container)",
            }}
          >
            {icon}
          </md-icon>
        </motion.div>
      ))}
    </div>
  );
}
