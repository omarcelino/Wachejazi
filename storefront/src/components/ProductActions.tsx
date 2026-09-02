"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/lib/products";
import { EASE_STANDARD } from "@/lib/motion";

export default function ProductActions({ product }: { product: Product }) {
  const hasSizes = product.sizes.length > 0;
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {hasSizes && (
        <div>
          <h2
            className="mb-2 text-sm font-medium uppercase tracking-wide"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Size
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <motion.div key={s} whileTap={{ scale: 0.92 }} className="inline-block">
                <md-outlined-button data-selected={size === s} onClick={() => setSize(s)}>
                  {s}
                </md-outlined-button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <motion.div whileTap={{ scale: 0.97 }} className="inline-block self-start">
        <md-filled-button disabled={hasSizes && !size} onClick={() => setAdded(true)}>
          <md-icon slot="icon">add_shopping_cart</md-icon>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "added" : "add"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: EASE_STANDARD }}
              style={{ display: "inline-block" }}
            >
              {added ? "Added" : "Add to cart"}
            </motion.span>
          </AnimatePresence>
        </md-filled-button>
      </motion.div>
    </div>
  );
}
