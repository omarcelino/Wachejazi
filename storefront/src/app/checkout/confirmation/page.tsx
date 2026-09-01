import SiteHeader from "@/components/SiteHeader";
import { formatKSh } from "@/lib/products";

const PAYMENT_LABELS: Record<string, string> = {
  mpesa: "M-Pesa",
  card: "Card",
  cod: "Cash on delivery",
};

const STEPS = ["Placed", "Packed", "Out for delivery", "Delivered"];

export default async function ConfirmationPage({
  searchParams,
}: PageProps<"/checkout/confirmation">) {
  const params = await searchParams;
  const name = typeof params.name === "string" && params.name.trim() ? params.name : "there";
  const total = typeof params.total === "string" ? Number(params.total) : null;
  const method =
    typeof params.method === "string" ? PAYMENT_LABELS[params.method] : null;

  return (
    <>
      <SiteHeader cartCount={0} />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-4 pb-24 pt-16 text-center">
        <md-icon
          style={{ fontSize: "48px", color: "var(--md-sys-color-primary)" }}
        >
          check_circle
        </md-icon>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Order placed, {name}!
        </h1>
        <p
          className="mt-2 text-base"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          {total !== null ? `${formatKSh(total)} — ` : ""}
          {method ? `paying by ${method}.` : "Confirmation on its way."}
        </p>

        <ol className="mt-10 flex w-full max-w-md items-center">
          {STEPS.map((step, index) => (
            <li key={step} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                <div
                  className="h-0.5 flex-1"
                  style={{
                    background:
                      index === 0
                        ? "transparent"
                        : "var(--md-sys-color-outline-variant)",
                  }}
                />
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    background:
                      index === 0
                        ? "var(--md-sys-color-primary)"
                        : "var(--md-sys-color-outline-variant)",
                  }}
                />
                <div
                  className="h-0.5 flex-1"
                  style={{
                    background:
                      index === STEPS.length - 1
                        ? "transparent"
                        : "var(--md-sys-color-outline-variant)",
                  }}
                />
              </div>
              <span
                className="text-xs"
                style={{
                  color:
                    index === 0
                      ? "var(--md-sys-color-primary)"
                      : "var(--md-sys-color-on-surface-variant)",
                  fontWeight: index === 0 ? 600 : 400,
                }}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <md-text-button href="/">Continue browsing</md-text-button>
        </div>
      </main>
    </>
  );
}
