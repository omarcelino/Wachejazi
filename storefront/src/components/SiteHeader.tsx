import Link from "next/link";
import DesktopNavLinks from "@/components/DesktopNavLinks";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import CartButton from "@/components/CartButton";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10">
      <div
        className="px-4 py-2 text-center text-xs font-medium sm:text-sm"
        style={{
          background: "var(--md-sys-color-primary)",
          color: "var(--md-sys-color-on-primary)",
        }}
      >
        Free delivery over KSh 12,000 · Order by 2pm for delivery in 1–2 days
      </div>
      <div className="border-b border-[color:var(--md-sys-color-outline-variant)] bg-[color:var(--md-sys-color-surface)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-8">
            <MobileNavDrawer />
            <Link href="/" className="text-xl font-bold tracking-tight">
              Wachejazi
            </Link>
            <DesktopNavLinks />
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <md-icon-button class="min-h-11 min-w-11" aria-label="Search" href="/search">
              <md-icon>search</md-icon>
            </md-icon-button>
            <md-icon-button class="min-h-11 min-w-11" href="/signin" aria-label="Account">
              <md-icon>person</md-icon>
            </md-icon-button>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
