import { PRODUCTS, CATEGORIES, type Product, type Category } from "./products";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/** Simple client-side multi-term substring search — the catalogue is 30
 * items, so no external search service is warranted for this. */
export function searchProducts(query: string): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return PRODUCTS.filter((product) => {
    const haystack = [
      product.name,
      product.blurb,
      product.description,
      product.category,
      ...product.audiences,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function searchCategories(query: string): Category[] {
  const q = normalize(query);
  if (!q) return [];
  return CATEGORIES.filter((category) => category.name.toLowerCase().includes(q));
}
