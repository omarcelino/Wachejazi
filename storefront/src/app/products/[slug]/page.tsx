import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import ProductActions from "@/components/ProductActions";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Wachejazi`,
    description: product.blurb,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader cartCount={2} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-8">
        <Link
          href="/#catalog"
          className="text-sm font-medium"
          style={{ color: "var(--md-sys-color-primary)" }}
        >
          ← All gear
        </Link>

        <span
          className="mt-6 block text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--md-sys-color-primary)" }}
        >
          {product.category}
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {product.name}
        </h1>
        <p className="mt-2 text-xl font-semibold tabular-nums">
          {product.price}
        </p>
        <p
          className="mt-4 text-base"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          {product.description}
        </p>

        {product.fitNote && (
          <div
            className="mt-6 rounded-xl px-4 py-3 text-sm"
            style={{
              background: "var(--md-sys-color-tertiary-container)",
              color: "var(--md-sys-color-on-tertiary-container)",
            }}
          >
            <strong>Fit note —</strong> {product.fitNote}
          </div>
        )}

        <p
          className="mt-3 text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          Returns accepted within {product.returnWindowDays} days of delivery.
        </p>

        <div className="mt-8">
          <ProductActions product={product} />
        </div>
      </main>

      <BottomNav />
    </>
  );
}
