import { parsePrice, type Product } from "./products";
import { SITE_URL } from "./site";

export type Crumb = { label: string; href?: string };

/** Real fields only — no rating/review aggregate, no brand, no fabricated
 * inventory count. `availability` is InStock because nothing in this data
 * model ever marks an item otherwise. */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "KES",
      price: parsePrice(product.price),
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}
