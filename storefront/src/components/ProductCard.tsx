"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/lib/products";
import { EASE_EMPHASIZED_DECELERATE, EASE_STANDARD } from "@/lib/motion";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: Math.min(index, 8) * 0.04,
        ease: EASE_EMPHASIZED_DECELERATE,
      }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <md-elevated-card class="flex h-full flex-col p-5" style={{ transition: `box-shadow 0.2s ${cssEase(EASE_STANDARD)}` }}>
        <Link href={`/products/${product.slug}`} className="block">
          <span
            className="text-xs font-medium uppercase tracking-wide"
            style={{ color: "var(--md-sys-color-primary)" }}
          >
            {product.category}
          </span>
          <h3 className="mt-1 text-lg font-semibold leading-snug">{product.name}</h3>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            {product.blurb}
          </p>
        </Link>
        <div className="mt-4 flex flex-1 items-end justify-between">
          <span className="text-base font-semibold tabular-nums">{product.price}</span>
          <md-filled-button>
            <md-icon slot="icon">add_shopping_cart</md-icon>
            Add
          </md-filled-button>
        </div>
      </md-elevated-card>
    </motion.div>
  );
}

function cssEase(curve: readonly [number, number, number, number]): string {
  return `cubic-bezier(${curve.join(",")})`;
}
