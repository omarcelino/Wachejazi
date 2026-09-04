import { Suspense } from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ProductListing from "@/components/ProductListing";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "All Gear",
  description: "The full Wachejazi range — football, running, gym, cycling and more.",
};

export default function ShopPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Gear" }]} />

        <h1 className="mt-4 text-3xl font-bold tracking-tight">All Gear</h1>

        <div className="mt-6">
          <Suspense fallback={<ProductGridSkeleton count={9} />}>
            <ProductListing products={PRODUCTS} facets={["category", "audience", "size"]} />
          </Suspense>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
