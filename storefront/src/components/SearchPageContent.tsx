"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import { searchProducts, searchCategories } from "@/lib/search";

type TextFieldElement = HTMLElement & { value: string };

export default function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [initialQuery] = useState(() => searchParams.get("q") ?? "");
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<TextFieldElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    function onInput() {
      setQuery(el?.value ?? "");
    }
    el.addEventListener("input", onInput);
    el.focus();
    return () => el.removeEventListener("input", onInput);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(url, { scroll: false });
  }, [query, pathname, router]);

  const trimmed = query.trim();
  const products = searchProducts(query);
  const categories = searchCategories(query);

  return (
    <div>
      <md-outlined-text-field
        ref={inputRef}
        label="Search"
        placeholder="Search football boots, jerseys, running shoes…"
        value={initialQuery}
        class="w-full"
      />

      {!trimmed ? (
        <div className="mt-6">
          <EmptyState
            icon="search"
            title="Search Wachejazi"
            description="Try a product name, a sport, or a team kit."
          />
        </div>
      ) : (
        <>
          <p
            className="mt-6 text-sm"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            {products.length} result{products.length === 1 ? "" : "s"} for &ldquo;{trimmed}&rdquo;
          </p>

          {categories.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
                  style={{
                    background: "var(--md-sys-color-secondary-container)",
                    color: "var(--md-sys-color-on-secondary-container)",
                  }}
                >
                  <md-icon style={{ fontSize: "16px" }}>{category.icon}</md-icon>
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {products.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="search_off"
              title={`No results for "${trimmed}"`}
              description="Check the spelling, or browse by sport instead."
              action={<md-outlined-button href="/shop">Browse all gear</md-outlined-button>}
            />
          )}
        </>
      )}
    </div>
  );
}
