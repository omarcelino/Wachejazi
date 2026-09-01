import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <md-elevated-card class="block p-5">
      <Link href={`/products/${product.slug}`} className="block">
        <span
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--md-sys-color-primary)" }}
        >
          {product.category}
        </span>
        <h3 className="mt-1 text-lg font-semibold leading-snug">{product.name}</h3>
        <p
          className="mt-1 text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          {product.blurb}
        </p>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-semibold tabular-nums">{product.price}</span>
        <md-filled-button>
          <md-icon slot="icon">add_shopping_cart</md-icon>
          Add
        </md-filled-button>
      </div>
    </md-elevated-card>
  );
}
