"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { getCategories } from "@/lib/products";
import { EASE_EMPHASIZED_DECELERATE, EASE_STANDARD } from "@/lib/motion";

const CATEGORIES = getCategories();

export default function ShopMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="flex items-center gap-1 text-sm font-medium"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Shop
        <md-icon style={{ fontSize: "18px" }}>
          {open ? "expand_less" : "expand_more"}
        </md-icon>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease: EASE_STANDARD } }}
            transition={{ duration: 0.18, ease: EASE_EMPHASIZED_DECELERATE }}
            className="absolute left-0 top-full z-20 mt-2 grid w-[36rem] grid-cols-2 gap-1 rounded-2xl border p-3 shadow-lg"
            style={{
              background: "var(--md-sys-color-surface-container-lowest)",
              borderColor: "var(--md-sys-color-outline-variant)",
            }}
          >
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                style={{ color: "var(--md-sys-color-on-surface)" }}
              >
                <md-icon style={{ color: "var(--md-sys-color-primary)", fontSize: "20px" }}>
                  {category.icon}
                </md-icon>
                <span className="font-medium">{category.name}</span>
                <span
                  className="ml-auto text-xs"
                  style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                >
                  {category.count}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
