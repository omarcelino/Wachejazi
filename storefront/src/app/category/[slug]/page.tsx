import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, getCategory, getProductsByCategory } from "@/lib/products";

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
    title: `${category.name} — Wachejazi`,
    description: `${category.name} gear in stock on Wachejazi.`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.name);

  return (
    <>
      <SiteHeader cartCount={2} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8">
        <Link
          href="/"
          className="text-sm font-medium"
          style={{ color: "var(--md-sys-color-primary)" }}
        >
          ← All sports
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <md-icon
            style={{ fontSize: "32px", color: "var(--md-sys-color-primary)" }}
          >
            {category.icon}
          </md-icon>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        </div>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          {products.length} item{products.length === 1 ? "" : "s"} in stock
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </main>

      <BottomNav />
    </>
  );
}
