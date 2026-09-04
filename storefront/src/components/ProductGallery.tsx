"use client";

import { motion } from "motion/react";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

// This project has no product photography (zero image assets in the repo).
// This is a standard "no image available" placeholder, not a decorative
// stand-in — swap it for real <Image> media the moment product photos exist.
// (A category glyph blown up to fill the frame was tried first, but Material
// Symbols' static subset is drawn for ~24px strokes; scaling it 4x+ makes it
// read as sparse/abstract rather than a recognizable shape.)
export default function ProductGallery({
  icon,
  label,
}: {
  icon: string;
  label: string;
}) {
  return (
    <motion.div
      className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-3xl"
      style={{ background: "var(--md-sys-color-surface-container)" }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: EASE_EMPHASIZED_DECELERATE }}
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-2xl"
        style={{ background: "var(--md-sys-color-primary-container)" }}
      >
        <md-icon
          style={{ fontSize: "36px", color: "var(--md-sys-color-on-primary-container)" }}
        >
          {icon}
        </md-icon>
      </div>
      <div className="flex items-center gap-1.5">
        <md-icon
          style={{ fontSize: "16px", color: "var(--md-sys-color-on-surface-variant)" }}
        >
          image
        </md-icon>
        <span
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          Photo coming soon
        </span>
      </div>
      <span className="sr-only">{label}</span>
    </motion.div>
  );
}
