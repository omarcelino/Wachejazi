"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/lib/products";
import { EASE_STANDARD } from "@/lib/motion";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ui/Toast";

export default function ProductActions({ product }: { product: Product }) {
  const hasSizes = product.sizes.length > 0;
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const showToast = useToast();
  const router = useRouter();
  const blocked = hasSizes && !size;

  function addToCart() {
    if (blocked) return;
    addItem(product.slug, size ?? "", qty);
    showToast(`Added ${qty > 1 ? `${qty} × ` : ""}${product.name}`, "check_circle");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function buyNow() {
    if (blocked) return;
    addItem(product.slug, size ?? "", qty);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-4">
      {hasSizes && (
        <div>
          <h2
            id="size-label"
            className="mb-2 text-sm font-medium uppercase tracking-wide"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Size
          </h2>
          {/* md-outlined-button's ElementInternals fully owns its exposed
              role/state and doesn't merge an author-supplied aria-pressed or
              role override (verified: even a raw setAttribute on the live
              element never reaches the accessibility tree) — an upstream
              component limitation, not fixable from here. The visible
              outline (data-selected, styled in globals.css) still shows
              selection sighted; the live region below covers screen
              readers instead of a per-button pressed state. */}
          <div role="group" aria-labelledby="size-label" className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <motion.div key={s} whileTap={{ scale: 0.92 }} className="inline-flex">
                <md-outlined-button
                  aria-label={`Size ${s}`}
                  class="min-h-11 min-w-11"
                  data-selected={size === s}
                  onClick={() => setSize(s)}
                >
                  {s}
                </md-outlined-button>
              </motion.div>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">
            {size ? `Size ${size} selected` : ""}
          </p>
        </div>
      )}

      <div>
        <h2
          className="mb-2 text-sm font-medium uppercase tracking-wide"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          Quantity
        </h2>
        <div className="flex items-center gap-3">
          <md-icon-button
            class="min-h-11 min-w-11"
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            <md-icon>remove</md-icon>
          </md-icon-button>
          <span
            aria-live="polite"
            className="w-6 text-center text-base font-semibold tabular-nums"
          >
            {qty}
          </span>
          <md-icon-button
            class="min-h-11 min-w-11"
            aria-label="Increase quantity"
            disabled={qty >= 10}
            onClick={() => setQty((q) => Math.min(10, q + 1))}
          >
            <md-icon>add</md-icon>
          </md-icon-button>
        </div>
      </div>

      {/* Desktop / inline actions — hidden on mobile in favor of the sticky bar below */}
      <div className="hidden gap-3 sm:flex">
        <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
          <md-filled-button class="min-h-11" disabled={blocked} onClick={addToCart}>
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
        <motion.div whileTap={{ scale: 0.97 }} className="inline-flex">
          <md-outlined-button class="min-h-11" disabled={blocked} onClick={buyNow}>
            Buy now
          </md-outlined-button>
        </motion.div>
      </div>

      {/* Mobile sticky purchase bar — replaces BottomNav on the product page */}
      <div
        className="fixed inset-x-0 bottom-0 z-20 flex gap-3 border-t px-4 py-3 sm:hidden"
        style={{
          background: "var(--md-sys-color-surface)",
          borderColor: "var(--md-sys-color-outline-variant)",
        }}
      >
        <div className="flex flex-1">
          <md-outlined-button disabled={blocked} onClick={buyNow} class="min-h-11 w-full">
            Buy now
          </md-outlined-button>
        </div>
        <div className="flex flex-1">
          <md-filled-button disabled={blocked} onClick={addToCart} class="min-h-11 w-full">
            <md-icon slot="icon">add_shopping_cart</md-icon>
            {added ? "Added" : "Add to cart"}
          </md-filled-button>
        </div>
      </div>
    </div>
  );
}
