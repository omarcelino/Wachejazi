import { Suspense } from "react";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ProductListing from "@/components/ProductListing";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { getAudience, getProductsByAudience } from "@/lib/products";

export default function AudienceCatalog({ slug }: { slug: string }) {
  const audience = getAudience(slug);
  if (!audience) notFound();

  const products = getProductsByAudience(audience.name);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: audience.name }]} />

        <div className="mt-4 flex items-center gap-3">
          <md-icon
            style={{ fontSize: "32px", color: "var(--md-sys-color-primary)" }}
          >
            {audience.icon}
          </md-icon>
          <h1 className="text-3xl font-bold tracking-tight">{audience.name}</h1>
        </div>

        <div className="mt-6">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductListing products={products} facets={["category", "size"]} />
          </Suspense>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
