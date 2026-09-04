import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" style={{ color: "var(--md-sys-color-outline)" }}>
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} style={{ color: "var(--md-sys-color-primary)" }}>
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                style={{ color: "var(--md-sys-color-on-surface-variant)" }}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
