import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, getCategories } from "@/lib/products";

export default function Home() {
  const categories = getCategories();

  return (
    <>
      <SiteHeader cartCount={2} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24">
        <section className="flex flex-col items-start gap-4 py-12 sm:py-16">
          <span
            className="text-sm font-medium uppercase tracking-wide"
            style={{ color: "var(--md-sys-color-primary)" }}
          >
            Order by 2pm, arrives before Saturday
          </span>
          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Gear up for your next match, not someday
          </h1>
          <p
            className="max-w-md text-base"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Football boots, running shoes, training kit and team jerseys —
            in stock and sized for how you actually play.
          </p>
          <md-filled-button trailing-icon href="#catalog">
            Shop match day gear
            <md-icon slot="icon">arrow_forward</md-icon>
          </md-filled-button>
        </section>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Shop by sport</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <md-elevated-card class="flex flex-col items-center gap-2 px-4 py-6 text-center">
                  <md-icon style={{ color: "var(--md-sys-color-primary)" }}>
                    {category.icon}
                  </md-icon>
                  <span className="text-sm font-semibold leading-snug">
                    {category.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                  >
                    {category.count} item{category.count === 1 ? "" : "s"}
                  </span>
                </md-elevated-card>
              </Link>
            ))}
          </div>
        </section>

        <section id="catalog" className="scroll-mt-20 py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            In stock this week
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
