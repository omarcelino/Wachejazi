import Link from "next/link";
import { getProduct } from "@/lib/products";

export default function RelatedProducts({
  slugs,
  title = "Goes well with this",
}: {
  slugs: string[];
  title?: string;
}) {
  const products = slugs.map(getProduct).filter((p) => p !== undefined);
  if (products.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="block min-w-[160px] shrink-0"
          >
            <md-elevated-card class="flex h-full flex-col gap-1 p-3">
              <span className="text-sm font-medium leading-snug">{product.name}</span>
              <span className="text-sm font-semibold tabular-nums">{product.price}</span>
            </md-elevated-card>
          </Link>
        ))}
      </div>
    </section>
  );
}
