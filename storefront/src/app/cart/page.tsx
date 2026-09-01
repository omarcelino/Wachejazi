import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import { formatKSh, parsePrice } from "@/lib/products";
import { getCartSummary, getArrivalLabel } from "@/lib/cart";

export default function CartPage() {
  const { items, subtotal, deliveryFee, total } = getCartSummary();
  const arrivalLabel = getArrivalLabel();

  return (
    <>
      <SiteHeader cartCount={items.length} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-8">
        <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>

        <ul className="mt-6 flex flex-col divide-y divide-[color:var(--md-sys-color-outline-variant)]">
          {items.map((item) => (
            <li key={item.slug} className="flex items-start justify-between gap-4 py-4">
              <div>
                <p className="font-semibold leading-snug">{item.product.name}</p>
                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                >
                  Size {item.size} · Qty {item.qty}
                </p>
              </div>
              <p className="whitespace-nowrap font-semibold tabular-nums">
                {formatKSh(parsePrice(item.product.price) * item.qty)}
              </p>
            </li>
          ))}
        </ul>

        <div
          className="mt-6 rounded-xl px-4 py-3 text-sm"
          style={{
            background: "var(--md-sys-color-secondary-container)",
            color: "var(--md-sys-color-on-secondary-container)",
          }}
        >
          Delivery — {formatKSh(deliveryFee)}, arrives {arrivalLabel}
        </div>

        <dl className="mt-6 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              Subtotal
            </dt>
            <dd className="tabular-nums">{formatKSh(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
              Delivery
            </dt>
            <dd className="tabular-nums">{formatKSh(deliveryFee)}</dd>
          </div>
          <div className="flex justify-between border-t border-[color:var(--md-sys-color-outline-variant)] pt-2 text-base font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatKSh(total)}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <md-filled-button href="/checkout">
            Proceed to checkout
          </md-filled-button>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
