import SiteHeader from "@/components/SiteHeader";
import OrderSuccess from "@/components/OrderSuccess";

const PAYMENT_LABELS: Record<string, string> = {
  mpesa: "M-Pesa",
  card: "Card",
  cod: "Cash on delivery",
};

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
        <OrderSuccess name={name} total={total} method={method ?? null} />

        <div className="mt-10">
          <md-text-button href="/">Continue browsing</md-text-button>
        </div>
      </main>
    </>
  );
}
