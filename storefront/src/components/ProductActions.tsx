"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

export default function ProductActions({ product }: { product: Product }) {
  const hasSizes = product.sizes.length > 0;
  const [size, setSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {hasSizes && (
        <div>
          <h2
            className="mb-2 text-sm font-medium uppercase tracking-wide"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Size
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <md-outlined-button
                key={s}
                data-selected={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </md-outlined-button>
            ))}
          </div>
        </div>
      )}

      <md-filled-button
        disabled={hasSizes && !size}
        onClick={() => setAdded(true)}
      >
        <md-icon slot="icon">add_shopping_cart</md-icon>
        {added ? "Added" : "Add to cart"}
      </md-filled-button>
    </div>
  );
}
