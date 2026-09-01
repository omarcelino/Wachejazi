import Link from "next/link";

export default function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--md-sys-color-outline-variant)] bg-[color:var(--md-sys-color-surface)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Wachejazi
        </Link>
        <div className="flex items-center gap-1">
          <md-icon-button aria-label="Search">
            <md-icon>search</md-icon>
          </md-icon-button>
          <div className="relative">
            <md-icon-button href="/cart" aria-label={`Cart, ${cartCount} items`}>
              <md-icon>shopping_cart</md-icon>
            </md-icon-button>
            {cartCount > 0 && (
              <md-badge
                value={String(cartCount)}
                class="pointer-events-none absolute right-0.5 top-0.5"
              ></md-badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
