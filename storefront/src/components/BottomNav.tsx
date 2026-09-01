"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const TABS = [
  { label: "Home", icon: "home", href: "/" },
  { label: "Browse", icon: "storefront", href: "/#catalog" },
  { label: "Cart", icon: "shopping_cart", href: "/cart" },
  { label: "Account", icon: "person", href: null },
] as const;

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onActivate = (event: Event) => {
      const { activeIndex } = (event as CustomEvent<{ activeIndex: number }>)
        .detail;
      const href = TABS[activeIndex]?.href;
      if (href) router.push(href);
    };
    bar.addEventListener("navigation-bar-activated", onActivate);
    return () => bar.removeEventListener("navigation-bar-activated", onActivate);
  }, [router]);

  const activeIndex = pathname === "/cart" ? 2 : 0;

  return (
    <md-navigation-bar
      ref={barRef}
      class="fixed inset-x-0 bottom-0 z-20 border-t border-[color:var(--md-sys-color-outline-variant)] sm:hidden"
    >
      {TABS.map((tab, index) => (
        <md-navigation-tab
          key={tab.label}
          label={tab.label}
          active={index === activeIndex}
        >
          <md-icon slot="active-icon">{tab.icon}</md-icon>
          <md-icon slot="inactive-icon">{tab.icon}</md-icon>
        </md-navigation-tab>
      ))}
    </md-navigation-bar>
  );
}
