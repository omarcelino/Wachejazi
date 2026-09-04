import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import IconCard from "@/components/IconCard";
import HeroIntro from "@/components/HeroIntro";
import HeroVisual from "@/components/HeroVisual";
import TrustBadges from "@/components/TrustBadges";
import Newsletter from "@/components/Newsletter";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRODUCTS, getCategories, getAudiences } from "@/lib/products";

const FEATURED_COUNT = 6;

export default function Home() {
  const categories = getCategories();
  const audiences = getAudiences();
  const featured = PRODUCTS.slice(0, FEATURED_COUNT);

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24">
        <section className="grid grid-cols-1 items-center gap-8 py-12 sm:grid-cols-2 sm:py-16">
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
            <div className="flex flex-wrap gap-3">
              <md-filled-button trailing-icon href="#featured">
                Shop match day gear
                <md-icon slot="icon">arrow_forward</md-icon>
              </md-filled-button>
              <md-outlined-button href="/shop">Explore all products</md-outlined-button>
            </div>
          </HeroIntro>
          <HeroVisual />
        </section>

        <section className="pb-8">
          <TrustBadges />
        </section>

        <section className="py-8">
          <SectionHeading title="Shop for" />
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
          <SectionHeading title="Shop by sport" />
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

        <section id="featured" className="scroll-mt-20 py-8">
          <SectionHeading
            title="Shop the range"
            action={
              <Link
                href="/shop"
                className="text-sm font-medium"
                style={{ color: "var(--md-sys-color-primary)" }}
              >
                View all {PRODUCTS.length} items →
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </section>

        <section className="py-8">
          <Newsletter />
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
