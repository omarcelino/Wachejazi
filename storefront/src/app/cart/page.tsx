import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageClient />;
}
