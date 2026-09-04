"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Product } from "@/lib/products";
import { getDiscountPercent } from "@/lib/products";
import { EASE_EMPHASIZED_DECELERATE, EASE_STANDARD } from "@/lib/motion";
import ProductBadge, { SaleBadge } from "@/components/ProductBadge";
import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ui/Toast";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const percentOff = getDiscountPercent(product);
  const { addItem } = useCart();
  const showToast = useToast();
  const needsSize = product.sizes.length > 0;

  function handleAdd(event: React.MouseEvent) {
    if (needsSize) return; // let the <Link> below carry the click to the product page
    event.preventDefault();
    addItem(product.slug, "", 1);
    showToast(`Added ${product.name}`, "check_circle");
  }

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
          {(product.badge || percentOff) && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {product.badge && <ProductBadge badge={product.badge} />}
              {percentOff && <SaleBadge percentOff={percentOff} />}
            </div>
          )}
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
          <span className="flex items-baseline gap-2">
            <span className="text-base font-semibold tabular-nums">{product.price}</span>
            {product.originalPrice && (
              <span
                className="text-sm tabular-nums line-through"
                style={{ color: "var(--md-sys-color-on-surface-variant)" }}
              >
                {product.originalPrice}
              </span>
            )}
          </span>
          {needsSize ? (
            <Link href={`/products/${product.slug}`} onClick={handleAdd}>
              <md-outlined-button>Select size</md-outlined-button>
            </Link>
          ) : (
            <motion.div whileTap={{ scale: 0.95 }} className="inline-block">
              <md-filled-button onClick={handleAdd}>
                <md-icon slot="icon">add_shopping_cart</md-icon>
                Add
              </md-filled-button>
            </motion.div>
          )}
        </div>
      </md-elevated-card>
    </motion.div>
  );
}

function cssEase(curve: readonly [number, number, number, number]): string {
  return `cubic-bezier(${curve.join(",")})`;
}
