import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { getAudience, getProductsByAudience } from "@/lib/products";

export default function AudienceCatalog({ slug }: { slug: string }) {
  const audience = getAudience(slug);
  if (!audience) notFound();

  const products = getProductsByAudience(audience.name);

  return (
    <>
      <SiteHeader cartCount={2} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8">
        <div className="flex items-center gap-3">
          <md-icon
            style={{ fontSize: "32px", color: "var(--md-sys-color-primary)" }}
          >
            {audience.icon}
          </md-icon>
          <h1 className="text-3xl font-bold tracking-tight">{audience.name}</h1>
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
