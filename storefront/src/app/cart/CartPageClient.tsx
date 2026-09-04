"use client";

import Link from "next/link";
import { motion } from "motion/react";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import CartSummary from "@/components/CartSummary";
import EmptyState from "@/components/ui/EmptyState";
import { useCart, useCartSummary } from "@/components/CartProvider";
import { formatKSh, parsePrice } from "@/lib/products";
import { getArrivalLabel } from "@/lib/cart";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

export default function CartPageClient() {
  const { updateQty, removeItem } = useCart();
  const { items, subtotal, deliveryFee, freeDeliveryRemaining } = useCartSummary();
  const arrivalLabel = getArrivalLabel();

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-8">
        <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>

        {items.length === 0 ? (
          <EmptyState
            icon="shopping_cart"
            title="Your cart is empty"
            description="Browse the range and add something for your next match."
            action={<md-filled-button href="/shop">Continue shopping</md-filled-button>}
          />
        ) : (
          <>
            <ul className="mt-6 flex flex-col divide-y divide-[color:var(--md-sys-color-outline-variant)]">
              {items.map((item) => (
                <motion.li
                  key={`${item.slug}-${item.size}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_EMPHASIZED_DECELERATE }}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <div>
                    <Link href={`/products/${item.slug}`} className="font-semibold leading-snug">
                      {item.product.name}
                    </Link>
                    {item.size && (
                      <p
                        className="mt-1 text-sm"
                        style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                      >
                        Size {item.size}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <md-icon-button
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        onClick={() => updateQty(item.slug, item.size, item.qty - 1)}
                      >
                        <md-icon>remove</md-icon>
                      </md-icon-button>
                      <span className="w-5 text-center text-sm font-semibold tabular-nums">
                        {item.qty}
                      </span>
                      <md-icon-button
                        aria-label={`Increase quantity of ${item.product.name}`}
                        disabled={item.qty >= 10}
                        onClick={() => updateQty(item.slug, item.size, item.qty + 1)}
                      >
                        <md-icon>add</md-icon>
                      </md-icon-button>
                      <md-icon-button
                        aria-label={`Remove ${item.product.name} from cart`}
                        onClick={() => removeItem(item.slug, item.size)}
                      >
                        <md-icon>delete</md-icon>
                      </md-icon-button>
                    </div>
                  </div>
                  <p className="whitespace-nowrap font-semibold tabular-nums">
                    {formatKSh(parsePrice(item.product.price) * item.qty)}
                  </p>
                </motion.li>
              ))}
            </ul>

            <CartSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              freeDeliveryRemaining={freeDeliveryRemaining}
              arrivalLabel={arrivalLabel}
            />
          </>
        )}
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
