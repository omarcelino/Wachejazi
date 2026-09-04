"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import { formatKSh, parsePrice, type Audience, type Product } from "@/lib/products";
import { EASE_EMPHASIZED_DECELERATE, EASE_STANDARD } from "@/lib/motion";

type Facet = "category" | "audience" | "size";

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

function useListParam(searchParams: URLSearchParams, key: string): string[] {
  return useMemo(
    () => searchParams.get(key)?.split(",").filter(Boolean) ?? [],
    [searchParams, key],
  );
}

export default function ProductListing({
  products,
  facets = [],
}: {
  products: Product[];
  facets?: Facet[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtersTriggerRef = useRef<HTMLElement>(null);

  const sort = searchParams.get("sort") ?? "recommended";
  const selectedCategories = useListParam(searchParams, "category");
  const selectedAudiences = useListParam(searchParams, "audience");
  const selectedSizes = useListParam(searchParams, "size");
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";

  const availableCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );
  const availableAudiences = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.audiences))) as Audience[],
    [products],
  );
  const availableSizes = useMemo(() => {
    const seen = new Set<string>();
    for (const product of products) for (const size of product.sizes) seen.add(size);
    return Array.from(seen);
  }, [products]);
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => parsePrice(p.price));
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  function updateParams(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleValue(key: string, value: string) {
    updateParams((params) => {
      const current = params.get(key)?.split(",").filter(Boolean) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      if (next.length) params.set(key, next.join(","));
      else params.delete(key);
    });
  }

  function setSort(value: string) {
    updateParams((params) => {
      if (value === "recommended") params.delete("sort");
      else params.set("sort", value);
    });
  }

  function setPriceBound(key: "minPrice" | "maxPrice", value: string) {
    updateParams((params) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    let list = products;
    if (selectedCategories.length)
      list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedAudiences.length)
      list = list.filter((p) => p.audiences.some((a) => selectedAudiences.includes(a)));
    if (selectedSizes.length)
      list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    if (minPrice) list = list.filter((p) => parsePrice(p.price) >= Number(minPrice));
    if (maxPrice) list = list.filter((p) => parsePrice(p.price) <= Number(maxPrice));

    if (sort === "price-asc") list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sort === "price-desc") list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));

    return list;
  }, [products, selectedCategories, selectedAudiences, selectedSizes, minPrice, maxPrice, sort]);

  const activeFilterCount =
    selectedCategories.length +
    selectedAudiences.length +
    selectedSizes.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  return (
    <div>
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: "var(--md-sys-color-outline-variant)" }}
      >
        <p className="text-sm" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
          {filtered.length} item{filtered.length === 1 ? "" : "s"}
        </p>
        <div className="flex items-center gap-2">
          {facets.length > 0 && (
            <md-outlined-button ref={filtersTriggerRef} onClick={() => setFiltersOpen(true)}>
              <md-icon slot="icon">filter_list</md-icon>
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </md-outlined-button>
          )}
          <select
            aria-label="Sort products"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border px-3 py-2 text-sm"
            style={{
              borderColor: "var(--md-sys-color-outline)",
              background: "var(--md-sys-color-surface)",
              color: "var(--md-sys-color-on-surface)",
            }}
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search_off"
          title="No items match your filters"
          description="Try clearing a filter to see more gear."
          action={<md-outlined-button onClick={clearAll}>Clear filters</md-outlined-button>}
        />
      )}

      <FilterDrawer
        open={filtersOpen}
        onClose={() => {
          setFiltersOpen(false);
          filtersTriggerRef.current?.focus();
        }}
        facets={facets}
        availableCategories={availableCategories}
        availableAudiences={availableAudiences}
        availableSizes={availableSizes}
        priceBounds={priceBounds}
        selectedCategories={selectedCategories}
        selectedAudiences={selectedAudiences}
        selectedSizes={selectedSizes}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onToggleCategory={(v) => toggleValue("category", v)}
        onToggleAudience={(v) => toggleValue("audience", v)}
        onToggleSize={(v) => toggleValue("size", v)}
        onSetMinPrice={(v) => setPriceBound("minPrice", v)}
        onSetMaxPrice={(v) => setPriceBound("maxPrice", v)}
        onClearAll={clearAll}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
}

function FilterDrawer({
  open,
  onClose,
  facets,
  availableCategories,
  availableAudiences,
  availableSizes,
  priceBounds,
  selectedCategories,
  selectedAudiences,
  selectedSizes,
  minPrice,
  maxPrice,
  onToggleCategory,
  onToggleAudience,
  onToggleSize,
  onSetMinPrice,
  onSetMaxPrice,
  onClearAll,
  activeFilterCount,
}: {
  open: boolean;
  onClose: () => void;
  facets: Facet[];
  availableCategories: string[];
  availableAudiences: Audience[];
  availableSizes: string[];
  priceBounds: { min: number; max: number };
  selectedCategories: string[];
  selectedAudiences: string[];
  selectedSizes: string[];
  minPrice: string;
  maxPrice: string;
  onToggleCategory: (value: string) => void;
  onToggleAudience: (value: string) => void;
  onToggleSize: (value: string) => void;
  onSetMinPrice: (value: string) => void;
  onSetMaxPrice: (value: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}) {
  const closeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-30"
            style={{ background: "var(--md-sys-color-scrim)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filter products"
            className="fixed inset-y-0 right-0 z-40 flex w-[85vw] max-w-sm flex-col overflow-y-auto"
            style={{ background: "var(--md-sys-color-surface)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.2, ease: EASE_STANDARD } }}
            transition={{ duration: 0.3, ease: EASE_EMPHASIZED_DECELERATE }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-lg font-bold tracking-tight">Filters</span>
              <md-icon-button ref={closeRef} aria-label="Close filters" onClick={onClose}>
                <md-icon>close</md-icon>
              </md-icon-button>
            </div>

            <div className="flex flex-col gap-6 px-4 pb-6">
              {facets.includes("category") && availableCategories.length > 1 && (
                <FacetGroup title="Sport">
                  {availableCategories.map((category) => (
                    <FacetCheckbox
                      key={category}
                      label={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => onToggleCategory(category)}
                    />
                  ))}
                </FacetGroup>
              )}

              {facets.includes("audience") && availableAudiences.length > 1 && (
                <FacetGroup title="Shop for">
                  {availableAudiences.map((audience) => (
                    <FacetCheckbox
                      key={audience}
                      label={audience}
                      checked={selectedAudiences.includes(audience)}
                      onChange={() => onToggleAudience(audience)}
                    />
                  ))}
                </FacetGroup>
              )}

              {facets.includes("size") && availableSizes.length > 0 && (
                <FacetGroup title="Size">
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <md-outlined-button
                        key={size}
                        data-selected={selectedSizes.includes(size)}
                        onClick={() => onToggleSize(size)}
                      >
                        {size}
                      </md-outlined-button>
                    ))}
                  </div>
                </FacetGroup>
              )}

              <FacetGroup title="Price">
                <p
                  className="mb-2 text-xs"
                  style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                >
                  {formatKSh(priceBounds.min)} – {formatKSh(priceBounds.max)}
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    aria-label="Minimum price"
                    placeholder={String(priceBounds.min)}
                    value={minPrice}
                    onChange={(event) => onSetMinPrice(event.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: "var(--md-sys-color-outline)" }}
                  />
                  <span style={{ color: "var(--md-sys-color-on-surface-variant)" }}>–</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    aria-label="Maximum price"
                    placeholder={String(priceBounds.max)}
                    value={maxPrice}
                    onChange={(event) => onSetMaxPrice(event.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: "var(--md-sys-color-outline)" }}
                  />
                </div>
              </FacetGroup>

              <div className="flex gap-3">
                <md-outlined-button
                  disabled={activeFilterCount === 0}
                  onClick={onClearAll}
                >
                  Clear all
                </md-outlined-button>
                <md-filled-button onClick={onClose}>Show results</md-filled-button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FacetGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">{title}</h3>
      {children}
    </div>
  );
}

function FacetCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4" />
      {label}
    </label>
  );
}
