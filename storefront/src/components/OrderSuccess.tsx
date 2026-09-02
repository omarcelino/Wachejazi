"use client";

import { motion } from "motion/react";
import { formatKSh } from "@/lib/products";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

const STEPS = ["Placed", "Packed", "Out for delivery", "Delivered"];

export default function OrderSuccess({
  name,
  total,
  method,
}: {
  name: string;
  total: number | null;
  method: string | null;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_EMPHASIZED_DECELERATE }}
      >
        <md-icon style={{ fontSize: "48px", color: "var(--md-sys-color-primary)" }}>
          check_circle
        </md-icon>
      </motion.div>

      <motion.h1
        className="mt-4 text-3xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: EASE_EMPHASIZED_DECELERATE }}
      >
        Order placed, {name}!
      </motion.h1>

      <motion.p
        className="mt-2 text-base"
        style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: EASE_EMPHASIZED_DECELERATE }}
      >
        {total !== null ? `${formatKSh(total)} — ` : ""}
        {method ? `paying by ${method}.` : "Confirmation on its way."}
      </motion.p>

      <ol className="mt-10 flex w-full max-w-md items-center">
        {STEPS.map((step, index) => (
          <li key={step} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              <motion.div
                className="h-0.5 flex-1 origin-left"
                style={{
                  background:
                    index === 0 ? "transparent" : "var(--md-sys-color-outline-variant)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.15, ease: EASE_EMPHASIZED_DECELERATE }}
              />
              <motion.span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{
                  background:
                    index === 0
                      ? "var(--md-sys-color-primary)"
                      : "var(--md-sys-color-outline-variant)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.35 + index * 0.15, ease: EASE_EMPHASIZED_DECELERATE }}
              />
              <motion.div
                className="h-0.5 flex-1 origin-left"
                style={{
                  background:
                    index === STEPS.length - 1
                      ? "transparent"
                      : "var(--md-sys-color-outline-variant)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.15, ease: EASE_EMPHASIZED_DECELERATE }}
              />
            </div>
            <motion.span
              className="text-xs"
              style={{
                color:
                  index === 0
                    ? "var(--md-sys-color-primary)"
                    : "var(--md-sys-color-on-surface-variant)",
                fontWeight: index === 0 ? 600 : 400,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.15 }}
            >
              {step}
            </motion.span>
          </li>
        ))}
      </ol>
    </>
  );
}
