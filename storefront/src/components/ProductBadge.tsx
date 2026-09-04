import type { Badge } from "@/lib/products";

const STYLES: Record<Badge, { background: string; color: string }> = {
  "Best Seller": {
    background: "var(--md-sys-color-tertiary-container)",
    color: "var(--md-sys-color-on-tertiary-container)",
  },
  New: {
    background: "var(--md-sys-color-secondary-container)",
    color: "var(--md-sys-color-on-secondary-container)",
  },
  "Low Stock": {
    background: "var(--md-sys-color-error-container)",
    color: "var(--md-sys-color-on-error-container)",
  },
};

export default function ProductBadge({ badge }: { badge: Badge }) {
  const style = STYLES[badge];
  return (
    <span
      className="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={style}
    >
      {badge}
    </span>
  );
}

export function SaleBadge({ percentOff }: { percentOff: number }) {
  return (
    <span
      className="inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{
        background: "var(--md-sys-color-primary-container)",
        color: "var(--md-sys-color-on-primary-container)",
      }}
    >
      <md-icon style={{ fontSize: "14px" }}>local_offer</md-icon>
      {percentOff}% off
    </span>
  );
}
