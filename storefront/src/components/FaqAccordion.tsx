"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_EMPHASIZED_DECELERATE } from "@/lib/motion";

export type FaqEntry = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className="flex flex-col divide-y rounded-2xl border"
      style={{ borderColor: "var(--md-sys-color-outline-variant)" }}
    >
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} style={{ borderColor: "var(--md-sys-color-outline-variant)" }}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <span className="font-medium">{item.question}</span>
              <md-icon
                style={{ fontSize: "20px", color: "var(--md-sys-color-on-surface-variant)" }}
              >
                {open ? "expand_less" : "expand_more"}
              </md-icon>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_EMPHASIZED_DECELERATE }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    className="px-5 pb-4 text-sm"
                    style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
