import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import FaqAccordion, { type FaqEntry } from "@/components/FaqAccordion";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/lib/cart";
import { formatKSh } from "@/lib/products";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Sizing, payment, delivery and returns answers for Wachejazi orders.",
};

// Every answer here is grounded in behavior actually implemented elsewhere
// in the app (checkout.tsx, per-product fitNote/returnWindowDays, etc.) —
// no policy details are invented.
const FAQS: FaqEntry[] = [
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

export default function FaqPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>

        <div className="mt-6">
          <FaqAccordion items={FAQS} />
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
