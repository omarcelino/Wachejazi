import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import MaterialProvider from "@/components/MaterialProvider";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

const ICONS = [
  "add_shopping_cart",
  "arrow_forward",
  "backpack",
  "check_circle",
  "checkroom",
  "directions_run",
  "fitness_center",
  "home",
  "local_shipping",
  "payments",
  "person",
  "search",
  "shopping_cart",
  "sports_basketball",
  "sports_soccer",
  "storefront",
].join(",");

export const metadata: Metadata = {
  title: "Wachejazi — Sports gear, delivered on match day",
  description:
    "Football boots, running shoes, training gear and team kits, ordered in minutes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full ${robotoFlex.variable}`}>
      <head>
        {/* Material Symbols is a variable icon font subset by name via query params,
            which next/font/google's API doesn't support — loaded directly by design. */}
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${ICONS}&display=block`}
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <MaterialProvider>{children}</MaterialProvider>
      </body>
    </html>
  );
}
