export type PaymentMethod = "mpesa" | "card" | "cod";

export type PaymentResult = { status: "unavailable"; reason: string };

/**
 * Integration boundary for payment processing.
 *
 * No payment gateway is wired up anywhere in this project — there is no
 * M-Pesa Daraja integration, no card processor, and no backend to reconcile
 * a provider's confirmation against an order record. (/customer-journey.md
 * stage 06 identifies exactly this reconciliation step as the single
 * highest-leverage fix for the real product — "confirming the order
 * server-side before showing paid removes the double-charge fear that
 * drives cart abandonment.")
 *
 * This function is the single place a real gateway (Daraja STK push, a
 * card processor's SDK, etc.) would be plugged in. Until then it always
 * reports itself as unavailable rather than pretending to confirm a charge
 * — callers must not present its result to the customer as a completed
 * payment.
 */
export async function initiatePayment(args: {
  method: PaymentMethod;
  amount: number;
  phone: string;
}): Promise<PaymentResult> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[payment] would initiate here — no gateway connected:", args);
  }
  return {
    status: "unavailable",
    reason: "No payment gateway is connected in this build.",
  };
}
