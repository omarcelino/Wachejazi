import type { Metadata } from "next";
import AudienceCatalog from "@/components/AudienceCatalog";

export const metadata: Metadata = {
  title: "Women",
  description: "Women's football, running, basketball and training gear.",
};

export default function WomenPage() {
  return <AudienceCatalog slug="women" />;
}
