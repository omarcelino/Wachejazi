import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import MaterialProvider from "@/components/MaterialProvider";
import MotionProvider from "@/components/MotionProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { CartProvider } from "@/components/CartProvider";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

const ICONS = [
  "add",
  "add_shopping_cart",
  "arrow_back",
  "arrow_forward",
  "backpack",
  "bolt",
  "check_circle",
  "checkroom",
  "child_care",
  "close",
  "delete",
  "directions_bike",
  "directions_run",
  "expand_less",
  "expand_more",
  "filter_list",
  "fitness_center",
  "home",
  "image",
  "local_offer",
  "local_shipping",
  "mail",
  "man",
  "menu",
  "payments",
  "person",
  "pool",
  "rate_review",
  "remove",
  "replay",
  "search",
  "search_off",
  "shopping_cart",
  "sort",
  "sports_basketball",
  "sports_soccer",
  "sports_tennis",
  "sports_volleyball",
  "storefront",
  "tune",
  "verified",
  "woman",
].join(",");

const SITE_TITLE = "Wachejazi — Sports gear, delivered on match day";
const SITE_DESCRIPTION =
  "Football boots, running shoes, training gear and team kits, ordered in minutes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — Wachejazi" },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Wachejazi",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full ${robotoFlex.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols is a variable icon font subset by name via query params,
            which next/font/google's API doesn't support — loaded directly by design. */}
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${ICONS}&display=block`}
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <MotionProvider>
          <MaterialProvider>
            <CartProvider>
              <ToastProvider>{children}</ToastProvider>
            </CartProvider>
          </MaterialProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
