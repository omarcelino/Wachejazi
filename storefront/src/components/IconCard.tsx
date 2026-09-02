"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

export default function IconCard({
  href,
  icon,
  label,
  count,
  index = 0,
}: {
  href: string;
  icon: string;
  label: string;
  count: number;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(index, 8) * 0.05,
        ease: EASE_EMPHASIZED_DECELERATE,
      }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link href={href}>
        <md-elevated-card class="flex flex-col items-center gap-2 px-4 py-6 text-center">
          <md-icon style={{ color: "var(--md-sys-color-primary)" }}>{icon}</md-icon>
          <span className="text-sm font-semibold leading-snug">{label}</span>
          <span
            className="text-xs"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            {count} item{count === 1 ? "" : "s"}
          </span>
        </md-elevated-card>
      </Link>
    </motion.div>
  );
}
