import type { FaqEntry } from "@/components/FaqAccordion";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "./cart";
import { formatKSh } from "./products";

// Every answer here is grounded in behavior actually implemented elsewhere
// in the app (checkout.tsx, per-product fitNote/returnWindowDays, etc.) —
// no policy details are invented. Shared by /faq and the homepage teaser.
export const FAQS: FaqEntry[] = [
  {
    question: "How do I choose the right size?",
    answer:
      "Each product page shows a fit note right next to the size selector — for example, whether it runs true to size or you should size up. We don't apply one generic size chart across every brand, since fit varies between them.",
  },
  {
    question: "What payment methods can I use?",
    answer: "M-Pesa, card, or cash on delivery — pick whichever works for you at checkout.",
  },
  {
    question: "How much is delivery, and how long does it take?",
    answer: `Delivery is ${formatKSh(DELIVERY_FEE)}, or free once your order passes ${formatKSh(FREE_DELIVERY_THRESHOLD)}. Order by 2pm for delivery in 1–2 days.`,
  },
  {
    question: "What's the return window?",
    answer:
      "It varies by product — each product page states its own return window under the size selector.",
  },
  {
    question: "Do I need an account to buy something?",
    answer:
      "No — checkout works as a guest. Creating an account just saves your details for next time.",
  },
  {
    question: "Can I pick up my order instead of home delivery?",
    answer:
      "Yes — checkout offers a few collection points around Nairobi as an alternative to doorstep delivery.",
  },
];
