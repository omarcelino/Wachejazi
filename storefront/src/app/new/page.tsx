import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getNewArrivals } from "@/lib/products";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest gear added to Wachejazi.",
};

export default function NewArrivalsPage() {
  const products = getNewArrivals();

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "New Arrivals" }]} />

        <h1 className="mt-4 text-3xl font-bold tracking-tight">New Arrivals</h1>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          {products.length} item{products.length === 1 ? "" : "s"}
        </p>

        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="storefront"
            title="Nothing new right now"
            description="Check back soon, or browse the full range."
            action={<md-filled-button href="/">Browse all gear</md-filled-button>}
          />
        )}
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
