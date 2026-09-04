"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import EmptyState from "@/components/ui/EmptyState";
import { formatKSh } from "@/lib/products";
import { getArrivalLabel } from "@/lib/cart";
import { useCart, useCartSummary } from "@/components/CartProvider";
import { initiatePayment, type PaymentMethod } from "@/lib/payment";
import { EASE_STANDARD } from "@/lib/motion";

type DeliveryMethod = "doorstep" | "pickup";
type TextFieldElement = HTMLElement & { value: string };

const PICKUP_POINTS = [
  "Kenyatta Avenue, Nairobi CBD",
  "Sarit Centre, Westlands",
  "Junction Mall, Ngong Road",
];

const PHONE_PATTERN = /^(?:\+254|0)[17]\d{8}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PAYMENT_NOTES: Record<PaymentMethod, string> = {
  mpesa: "You'll get an M-Pesa prompt on this number to confirm payment.",
  card: "You'll be redirected to enter card details securely.",
  cod: "Pay the courier in cash when your order arrives.",
};

function RadioRow({
  checked,
  onSelect,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5" onClick={onSelect}>
      <md-radio checked={checked} onChange={onSelect} />
      <span className="text-sm">{children}</span>
    </label>
  );
}

export default function CheckoutPageClient() {
  const router = useRouter();
  const { clear } = useCart();
  const { items, subtotal, deliveryFee, total } = useCartSummary();
  const arrivalLabel = getArrivalLabel();

  const nameRef = useRef<TextFieldElement>(null);
  const phoneRef = useRef<TextFieldElement>(null);
  const emailRef = useRef<TextFieldElement>(null);
  const addressRef = useRef<TextFieldElement>(null);

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("doorstep");
  const [pickupPoint, setPickupPoint] = useState(PICKUP_POINTS[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function placeOrder() {
    if (submitting) return; // guard against duplicate submission

    const fullName = nameRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const address = addressRef.current?.value.trim() ?? "";

    if (!fullName) {
      setError("Add your name to continue.");
      return;
    }
    if (!PHONE_PATTERN.test(phone)) {
      setError("Enter a valid Kenyan phone number, e.g. 0712 345 678.");
      return;
    }
    if (email && !EMAIL_PATTERN.test(email)) {
      setError("That email address doesn't look right.");
      return;
    }
    if (deliveryMethod === "doorstep" && !address) {
      setError("Add a delivery address, or switch to a pickup point.");
      return;
    }

    setError(null);
    setSubmitting(true);

    // See src/lib/payment.ts — no payment gateway is connected in this build,
    // so this never reports success; the order below is recorded locally
    // regardless, since this checkout has no backend to persist it to either.
    await initiatePayment({ method: paymentMethod, amount: total, phone });

    const params = new URLSearchParams({
      name: fullName,
      total: String(total),
      method: paymentMethod,
    });
    clear();
    router.push(`/checkout/confirmation?${params.toString()}`);
  }

  if (items.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-8">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <EmptyState
            icon="shopping_cart"
            title="Your cart is empty"
            description="Add something to your cart before checking out."
            action={<md-filled-button href="/shop">Continue shopping</md-filled-button>}
          />
        </main>
        <Footer />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-8">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Contact
          </h2>
          <div className="flex flex-col gap-4">
            <md-outlined-text-field ref={nameRef} label="Full name" />
            <md-outlined-text-field
              ref={phoneRef}
              label="Phone number"
              type="tel"
              placeholder="07XX XXX XXX"
            />
            <md-outlined-text-field
              ref={emailRef}
              label="Email (optional)"
              type="email"
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
            <md-icon style={{ fontSize: "18px" }}>local_shipping</md-icon>
            Delivery
          </h2>
          <div role="radiogroup" aria-label="Delivery method">
            <RadioRow
              checked={deliveryMethod === "doorstep"}
              onSelect={() => setDeliveryMethod("doorstep")}
            >
              Deliver to my address
            </RadioRow>
            <RadioRow
              checked={deliveryMethod === "pickup"}
              onSelect={() => setDeliveryMethod("pickup")}
            >
              Pick up at a collection point
            </RadioRow>
          </div>

          <div className="mt-3" hidden={deliveryMethod !== "doorstep"}>
            <md-outlined-text-field ref={addressRef} label="Delivery address" />
          </div>
          <div
            className="mt-3 pl-1"
            role="radiogroup"
            aria-label="Pickup point"
            hidden={deliveryMethod !== "pickup"}
          >
            {PICKUP_POINTS.map((point) => (
              <RadioRow
                key={point}
                checked={pickupPoint === point}
                onSelect={() => setPickupPoint(point)}
              >
                {point}
              </RadioRow>
            ))}
          </div>

          <p
            className="mt-3 text-sm"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Estimated arrival: {arrivalLabel}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
            <md-icon style={{ fontSize: "18px" }}>payments</md-icon>
            Payment
          </h2>
          <div role="radiogroup" aria-label="Payment method">
            <RadioRow
              checked={paymentMethod === "mpesa"}
              onSelect={() => setPaymentMethod("mpesa")}
            >
              M-Pesa
            </RadioRow>
            <RadioRow
              checked={paymentMethod === "card"}
              onSelect={() => setPaymentMethod("card")}
            >
              Card
            </RadioRow>
            <RadioRow
              checked={paymentMethod === "cod"}
              onSelect={() => setPaymentMethod("cod")}
            >
              Cash on delivery
            </RadioRow>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={paymentMethod}
              className="mt-3 text-sm"
              style={{ color: "var(--md-sys-color-on-surface-variant)" }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: EASE_STANDARD }}
            >
              {PAYMENT_NOTES[paymentMethod]}
            </motion.p>
          </AnimatePresence>
        </section>

        <section className="mt-8 border-t border-[color:var(--md-sys-color-outline-variant)] pt-4">
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                Subtotal
              </dt>
              <dd className="tabular-nums">{formatKSh(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                Delivery
              </dt>
              <dd className="tabular-nums">{deliveryFee === 0 ? "Free" : formatKSh(deliveryFee)}</dd>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <dt>Total</dt>
              <dd className="tabular-nums">{formatKSh(total)}</dd>
            </div>
          </dl>
        </section>

        <AnimatePresence>
          {error && (
            <motion.p
              className="mt-4 text-sm"
              style={{ color: "var(--md-sys-color-error)" }}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_STANDARD }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-6">
          <md-filled-button disabled={submitting} onClick={placeOrder}>
            {submitting ? "Placing order…" : "Place order"}
          </md-filled-button>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
