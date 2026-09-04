"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ShopMenu from "@/components/ShopMenu";

const LINKS = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "New Arrivals", href: "/new" },
];

export default function DesktopNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-6 sm:flex">
      <ShopMenu />
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className="text-sm font-medium"
            style={{
              color: active ? "var(--md-sys-color-primary)" : "var(--md-sys-color-on-surface)",
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
