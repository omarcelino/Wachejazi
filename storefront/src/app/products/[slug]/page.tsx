import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProductActions from "@/components/ProductActions";
import ProductGallery from "@/components/ProductGallery";
import ProductBadge, { SaleBadge } from "@/components/ProductBadge";
import TrustBadges from "@/components/TrustBadges";
import RelatedProducts from "@/components/RelatedProducts";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import { PRODUCTS, getProduct, getDiscountPercent, getCategoryByName } from "@/lib/products";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo";

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
    title: product.name,
    description: product.blurb,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.blurb,
      type: "website",
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const percentOff = getDiscountPercent(product);
  const category = getCategoryByName(product.category);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "All Gear", href: "/shop" },
    ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
    { label: product.name },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />
      <SiteHeader />

      {/* pb-24 clears the mobile sticky purchase bar rendered by ProductActions */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <ProductGallery icon={category?.icon ?? "storefront"} label={product.name} />

          <div>
            {(product.badge || percentOff) && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {product.badge && <ProductBadge badge={product.badge} />}
                {percentOff && <SaleBadge percentOff={percentOff} />}
              </div>
            )}
            <span
              className="block text-xs font-medium uppercase tracking-wide"
              style={{ color: "var(--md-sys-color-primary)" }}
            >
              {product.category}
            </span>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-2 flex items-baseline gap-2 text-xl font-semibold tabular-nums">
              {product.price}
              {product.originalPrice && (
                <span
                  className="text-base font-normal line-through"
                  style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                >
                  {product.originalPrice}
                </span>
              )}
            </p>
            {product.badge === "Low Stock" && product.stockLeft !== undefined && (
              <p
                className="mt-1 flex items-center gap-1 text-sm font-medium"
                style={{ color: "var(--md-sys-color-error)" }}
              >
                <md-icon style={{ fontSize: "16px" }}>bolt</md-icon>
                Only {product.stockLeft} left in stock
              </p>
            )}
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
          </div>
        </div>

        <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-lg font-semibold tracking-tight">Details</h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between border-b py-2" style={{ borderColor: "var(--md-sys-color-outline-variant)" }}>
                <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Sport</dt>
                <dd>{product.category}</dd>
              </div>
              <div className="flex justify-between border-b py-2" style={{ borderColor: "var(--md-sys-color-outline-variant)" }}>
                <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Sizes available</dt>
                <dd className="text-right">
                  {product.sizes.length > 0 ? product.sizes.join(", ") : "One size"}
                </dd>
              </div>
              <div className="flex justify-between border-b py-2" style={{ borderColor: "var(--md-sys-color-outline-variant)" }}>
                <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Shop for</dt>
                <dd>{product.audiences.join(", ")}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Return window</dt>
                <dd>{product.returnWindowDays} days</dd>
              </div>
            </dl>
          </div>
          <TrustBadges className="grid-cols-1 self-start" />
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Reviews</h2>
          <EmptyState
            icon="rate_review"
            title="No reviews yet"
            description="Be the first to review this item after your order arrives."
          />
        </section>

        {product.pairsWith && <RelatedProducts slugs={product.pairsWith} />}
      </main>

      <Footer />
    </>
  );
}
