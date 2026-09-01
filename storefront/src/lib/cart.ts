import { getProduct, parsePrice } from "./products";

// Mock cart contents — no cart persistence yet, see /customer-journey.md stage 04.
export const CART_ITEMS = [
  { slug: "firm-ground-match-boots", size: "42", qty: 1 },
  { slug: "pro-shin-guards", size: "Adult L/XL", qty: 1 },
] as const;

export const DELIVERY_FEE = 300;

export function getCartSummary() {
  const items = CART_ITEMS.map((item) => ({
    ...item,
    product: getProduct(item.slug)!,
  }));
  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.qty,
    0,
  );
  return { items, subtotal, deliveryFee: DELIVERY_FEE, total: subtotal + DELIVERY_FEE };
}

export function getArrivalLabel(daysFromNow = 2): string {
  const arrival = new Date();
  arrival.setDate(arrival.getDate() + daysFromNow);
  return arrival.toLocaleDateString("en-KE", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
