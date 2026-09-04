"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { formatKSh } from "@/lib/products";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/cart";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

type TextFieldElement = HTMLElement & { value: string };

const PROMO_CODES: Record<string, number> = {
  MATCHDAY10: 10,
  WELCOME5: 5,
};

export default function CartSummary({
  subtotal,
  deliveryFee,
  freeDeliveryRemaining,
  arrivalLabel,
}: {
  subtotal: number;
  deliveryFee: number;
  freeDeliveryRemaining: number;
  arrivalLabel: string;
}) {
  const promoRef = useRef<TextFieldElement>(null);
  const [applied, setApplied] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  function applyPromo() {
    const code = promoRef.current?.value.trim().toUpperCase() ?? "";
    if (!code) return;
    const percent = PROMO_CODES[code];
    if (!percent) {
      setPromoError("That code isn't valid — try MATCHDAY10.");
      setApplied(null);
      return;
    }
    setPromoError(null);
    setApplied({ code, percent });
  }

  const discount = applied ? Math.round((subtotal * applied.percent) / 100) : 0;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div
        className="rounded-xl px-4 py-3 text-sm"
        style={{
          background: "var(--md-sys-color-secondary-container)",
          color: "var(--md-sys-color-on-secondary-container)",
        }}
      >
        {freeDeliveryRemaining > 0 ? (
          <>
            <p>
              Add <strong>{formatKSh(freeDeliveryRemaining)}</strong> more to unlock free
              delivery, arriving {arrivalLabel}
            </p>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
              style={{ background: "var(--md-sys-color-surface)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--md-sys-color-primary)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: EASE_EMPHASIZED_DECELERATE }}
              />
            </div>
          </>
        ) : (
          <p className="flex items-center gap-2">
            <md-icon style={{ fontSize: "18px" }}>local_shipping</md-icon>
            Free delivery unlocked — arrives {arrivalLabel}
          </p>
        )}
      </div>

      <div>
        <h2
          className="mb-2 text-sm font-medium uppercase tracking-wide"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          Promo code
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <md-outlined-text-field ref={promoRef} label="Enter code" placeholder="MATCHDAY10" />
          <md-outlined-button onClick={applyPromo}>Apply</md-outlined-button>
        </div>
        {promoError && (
          <p className="mt-2 text-sm" style={{ color: "var(--md-sys-color-error)" }}>
            {promoError}
          </p>
        )}
        {applied && (
          <p className="mt-2 flex items-center gap-1 text-sm" style={{ color: "var(--md-sys-color-primary)" }}>
            <md-icon style={{ fontSize: "16px" }}>local_offer</md-icon>
            {applied.percent}% off applied
          </p>
        )}
      </div>

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Subtotal</dt>
          <dd className="tabular-nums">{formatKSh(subtotal)}</dd>
        </div>
        {applied && (
          <div className="flex justify-between" style={{ color: "var(--md-sys-color-primary)" }}>
            <dt>Promo ({applied.code})</dt>
            <dd className="tabular-nums">-{formatKSh(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Delivery</dt>
          <dd className="tabular-nums">{deliveryFee === 0 ? "Free" : formatKSh(deliveryFee)}</dd>
        </div>
        <div className="flex justify-between border-t border-[color:var(--md-sys-color-outline-variant)] pt-2 text-base font-semibold">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatKSh(total)}</dd>
        </div>
      </dl>

      <div>
        <md-filled-button href="/checkout">Proceed to checkout</md-filled-button>
      </div>
    </div>
  );
}
