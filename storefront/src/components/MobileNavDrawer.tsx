"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { getCategories } from "@/lib/products";
import { EASE_EMPHASIZED_DECELERATE, EASE_STANDARD } from "@/lib/motion";

const CATEGORIES = getCategories();

const AUDIENCE_LINKS = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
];

export default function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <md-icon-button
        ref={triggerRef}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        class="sm:hidden"
      >
        <md-icon>menu</md-icon>
      </md-icon-button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-30 sm:hidden"
              style={{ background: "var(--md-sys-color-scrim)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 left-0 z-40 flex w-[85vw] max-w-sm flex-col overflow-y-auto sm:hidden"
              style={{ background: "var(--md-sys-color-surface)" }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%", transition: { duration: 0.2, ease: EASE_STANDARD } }}
              transition={{ duration: 0.3, ease: EASE_EMPHASIZED_DECELERATE }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-lg font-bold tracking-tight">Menu</span>
                <md-icon-button ref={closeRef} aria-label="Close menu" onClick={() => setOpen(false)}>
                  <md-icon>close</md-icon>
                </md-icon-button>
              </div>

              <nav className="flex flex-col px-2 pb-6">
                <p
                  className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                >
                  Shop for
                </p>
                {AUDIENCE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/new"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium"
                >
                  New Arrivals
                </Link>

                <p
                  className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                >
                  Shop by sport
                </p>
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-base"
                  >
                    <md-icon style={{ color: "var(--md-sys-color-primary)", fontSize: "20px" }}>
                      {category.icon}
                    </md-icon>
                    {category.name}
                  </Link>
                ))}

                <div
                  className="mx-3 mt-4 border-t pt-4"
                  style={{ borderColor: "var(--md-sys-color-outline-variant)" }}
                >
                  <Link
                    href="/signin"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium"
                  >
                    Create account
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
