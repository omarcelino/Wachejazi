import Link from "next/link";
import { getCategories } from "@/lib/products";

const PAYMENT_METHODS = ["M-Pesa", "Visa", "Mastercard", "Cash on delivery"];

export default function Footer() {
  const categories = getCategories();

  return (
    <footer
      className="mt-16 border-t px-4 pb-24 pt-10 sm:pb-10"
      style={{ borderColor: "var(--md-sys-color-outline-variant)" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-lg font-bold tracking-tight">Wachejazi</span>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            Sports gear for people with a match on the calendar, not someday.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Shop</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link href="/shop" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                All Gear
              </Link>
            </li>
            {categories.slice(0, 5).map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Help</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link href="/faq" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/faq" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                Returns &amp; exchanges
              </Link>
            </li>
            <li>
              <Link href="/faq" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                Delivery &amp; payment
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">We accept</h3>
          <ul
            className="mt-3 flex flex-col gap-2 text-sm"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
          >
            {PAYMENT_METHODS.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mx-auto mt-10 max-w-6xl border-t pt-6 text-xs"
        style={{
          borderColor: "var(--md-sys-color-outline-variant)",
          color: "var(--md-sys-color-on-surface-variant)",
        }}
      >
        © {new Date().getFullYear()} Wachejazi. All prices in Kenyan Shillings.
      </div>
    </footer>
  );
}
