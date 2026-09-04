"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import EmptyState from "@/components/ui/EmptyState";
import { formatKSh, parsePrice } from "@/lib/products";
import { getArrivalLabel } from "@/lib/cart";
import { useCart, useCartSummary } from "@/components/CartProvider";
import { initiatePayment, type PaymentMethod } from "@/lib/payment";
import { EASE_STANDARD } from "@/lib/motion";

type DeliveryMethod = "doorstep" | "pickup";
type TextFieldElement = HTMLElement & { value: string; focus: () => void; scrollIntoView: (opts?: ScrollIntoViewOptions) => void };
type FieldErrors = { name?: string; phone?: string; email?: string; address?: string };

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
    <label className="flex min-h-11 cursor-pointer items-center gap-3" onClick={onSelect}>
      <md-radio class="min-h-11 min-w-11" checked={checked} onChange={onSelect} />
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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  async function placeOrder() {
    if (submitting) return; // guard against duplicate submission

    const fullName = nameRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    const address = addressRef.current?.value.trim() ?? "";

    const errors: FieldErrors = {};
    if (!fullName) errors.name = "Add your name to continue.";
    if (!PHONE_PATTERN.test(phone)) {
      errors.phone = "Enter a valid Kenyan phone number, e.g. 0712 345 678.";
    }
    if (email && !EMAIL_PATTERN.test(email)) {
      errors.email = "That email address doesn't look right.";
    }
    if (deliveryMethod === "doorstep" && !address) {
      errors.address = "Add a delivery address, or switch to a pickup point.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstInvalidRef = errors.name
        ? nameRef
        : errors.phone
          ? phoneRef
          : errors.email
            ? emailRef
            : addressRef;
      firstInvalidRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalidRef.current?.focus();
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    // See src/lib/payment.ts — no payment gateway is connected in this build,
    // so this never reports success; the order below is recorded locally
    // regardless, since this checkout has no backend to persist it to either.
    await initiatePayment({ method: paymentMethod, amount: total, phone });

    // Captured only so the confirmation page can show what was actually
    // ordered — cleared as soon as it's read, so a later unrelated visit
    // to that URL never shows a stale order's contents.
    sessionStorage.setItem(
      "wachejazi.lastOrder",
      JSON.stringify({
        items: items.map((item) => ({
          slug: item.slug,
          name: item.product.name,
          size: item.size,
          qty: item.qty,
          price: item.product.price,
        })),
      }),
    );

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
            action={<md-filled-button class="min-h-11" href="/shop">Continue shopping</md-filled-button>}
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
        <Link
          href="/cart"
          className="-ml-2 flex min-h-11 w-fit items-center gap-1 rounded-full px-2 text-sm font-medium"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          <md-icon style={{ fontSize: "18px" }}>arrow_back</md-icon>
          Back to cart
        </Link>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Checkout</h1>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
            Contact
          </h2>
          <div className="flex flex-col gap-4">
            <md-outlined-text-field
              ref={nameRef}
              label="Full name"
              error={!!fieldErrors.name}
              error-text={fieldErrors.name ?? ""}
            />
            <md-outlined-text-field
              ref={phoneRef}
              label="Phone number"
              type="tel"
              placeholder="07XX XXX XXX"
              error={!!fieldErrors.phone}
              error-text={fieldErrors.phone ?? ""}
            />
            <md-outlined-text-field
              ref={emailRef}
              label="Email (optional)"
              type="email"
              error={!!fieldErrors.email}
              error-text={fieldErrors.email ?? ""}
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
            <md-outlined-text-field
              ref={addressRef}
              label="Delivery address"
              error={!!fieldErrors.address}
              error-text={fieldErrors.address ?? ""}
            />
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
          {/* md-radio's role/checked state is owned by its own ElementInternals
              and doesn't reach the accessibility tree here (confirmed: adding
              name/aria-label to the element has no effect, and it never shows
              up via an accessible-role query) — same upstream limitation as
              md-outlined-button's aria-pressed. This live region gives screen
              reader users the selection confirmation the component itself
              can't expose. */}
          <p aria-live="polite" className="sr-only">
            {deliveryMethod === "doorstep"
              ? "Delivery method: Deliver to my address"
              : `Delivery method: Pick up at ${pickupPoint}`}
          </p>

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
          <p aria-live="polite" className="sr-only">
            {`Payment method: ${
              paymentMethod === "mpesa" ? "M-Pesa" : paymentMethod === "card" ? "Card" : "Cash on delivery"
            }`}
          </p>
        </section>

        <section className="mt-8 border-t border-[color:var(--md-sys-color-outline-variant)] pt-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Order summary</h2>
            <Link
              href="/cart"
              className="text-sm font-medium"
              style={{ color: "var(--md-sys-color-primary)" }}
            >
              Edit cart
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={`${item.slug}-${item.size}`}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <div>
                  <p className="font-medium leading-snug">{item.product.name}</p>
                  <p style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                    {item.size ? `Size ${item.size} · ` : ""}Qty {item.qty}
                  </p>
                </div>
                <p className="whitespace-nowrap font-medium tabular-nums">
                  {formatKSh(parsePrice(item.product.price) * item.qty)}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 flex flex-col gap-2 border-t border-[color:var(--md-sys-color-outline-variant)] pt-4 text-sm">
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

        <p aria-live="assertive" className="sr-only">
          {Object.keys(fieldErrors).length > 0
            ? `There ${Object.keys(fieldErrors).length === 1 ? "is" : "are"} ${
                Object.keys(fieldErrors).length
              } error${Object.keys(fieldErrors).length === 1 ? "" : "s"} in the form above.`
            : ""}
        </p>

        <div className="mt-6 flex">
          <md-filled-button class="min-h-11" disabled={submitting} onClick={placeOrder}>
            {submitting ? "Placing order…" : "Place order"}
          </md-filled-button>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
