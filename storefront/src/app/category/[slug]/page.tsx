import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ProductListing from "@/components/ProductListing";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { CATEGORIES, getCategory, getProductsByCategory } from "@/lib/products";
import { breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.name} gear in stock on Wachejazi.`,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.name);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "All Gear", href: "/shop" },
    { label: category.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-4 flex items-center gap-3">
          <md-icon
            style={{ fontSize: "32px", color: "var(--md-sys-color-primary)" }}
          >
            {category.icon}
          </md-icon>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        </div>

        <div className="mt-6">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductListing products={products} facets={["audience", "size"]} />
          </Suspense>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
