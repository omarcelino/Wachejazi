import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import IconCard from "@/components/IconCard";
import HeroIntro from "@/components/HeroIntro";
import { PRODUCTS, getCategories, getAudiences } from "@/lib/products";

export default function Home() {
  const categories = getCategories();
  const audiences = getAudiences();

  return (
    <>
      <SiteHeader cartCount={2} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24">
        <section className="py-12 sm:py-16">
          <HeroIntro>
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
          </HeroIntro>
        </section>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Shop for</h2>
          <div className="grid grid-cols-3 gap-4">
            {audiences.map((audience, i) => (
              <IconCard
                key={audience.slug}
                href={`/${audience.slug}`}
                icon={audience.icon}
                label={audience.name}
                count={audience.count}
                index={i}
              />
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Shop by sport</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, i) => (
              <IconCard
                key={category.slug}
                href={`/category/${category.slug}`}
                icon={category.icon}
                label={category.name}
                count={category.count}
                index={i}
              />
            ))}
          </div>
        </section>

        <section id="catalog" className="scroll-mt-20 py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            In stock this week
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
