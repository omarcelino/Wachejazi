import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FAQS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Sizing, payment, delivery and returns answers for Wachejazi orders.",
};

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
