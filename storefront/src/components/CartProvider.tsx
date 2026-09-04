"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, parsePrice, type Product } from "@/lib/products";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/lib/cart";

export type CartLine = { slug: string; size: string; qty: number };

const STORAGE_KEY = "wachejazi.cart.v1";

type CartContextValue = {
  lines: CartLine[];
  addItem: (slug: string, size: string, qty?: number) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  removeItem: (slug: string, size: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line?.slug === "string" &&
        typeof line?.size === "string" &&
        typeof line?.qty === "number" &&
        line.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Cart lives only in this browser (localStorage) — there's no backend to persist it to.
  // localStorage isn't available during SSR, so this one-time read-on-mount is the
  // correct way to adopt it (see react.dev/learn/you-might-not-need-an-effect —
  // "adopting external data not available during rendering" is an explicit exception).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLines(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback((slug: string, size: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.slug === slug && line.size === size);
      if (existing) {
        return prev.map((line) =>
          line === existing ? { ...line, qty: line.qty + qty } : line,
        );
      }
      return [...prev, { slug, size, qty }];
    });
  }, []);

  const updateQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((line) => !(line.slug === slug && line.size === size));
      return prev.map((line) =>
        line.slug === slug && line.size === size ? { ...line, qty } : line,
      );
    });
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setLines((prev) => prev.filter((line) => !(line.slug === slug && line.size === size)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.qty, 0), [lines]);

  const value = useMemo(
    () => ({ lines, addItem, updateQty, removeItem, clear, count }),
    [lines, addItem, updateQty, removeItem, clear, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export type CartItem = CartLine & { product: Product };

export function useCartSummary() {
  const { lines } = useCart();

  return useMemo(() => {
    const items: CartItem[] = lines.flatMap((line) => {
      const product = getProduct(line.slug);
      return product ? [{ ...line, product }] : [];
    });
    const subtotal = items.reduce(
      (sum, item) => sum + parsePrice(item.product.price) * item.qty,
      0,
    );
    const qualifiesForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
    const deliveryFee = items.length === 0 || qualifiesForFreeDelivery ? 0 : DELIVERY_FEE;
    const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
    return {
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      qualifiesForFreeDelivery,
      freeDeliveryRemaining,
    };
  }, [lines]);
}
