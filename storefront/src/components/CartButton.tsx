"use client";

import { motion, AnimatePresence } from "motion/react";
import { useCart } from "@/components/CartProvider";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

export default function CartButton() {
  const { count } = useCart();

  return (
    <div className="relative">
      <md-icon-button href="/cart" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
        <md-icon>shopping_cart</md-icon>
      </md-icon-button>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            key={count}
            className="pointer-events-none absolute right-0.5 top-0.5"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_EMPHASIZED_DECELERATE }}
          >
            <md-badge value={String(count)}></md-badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
