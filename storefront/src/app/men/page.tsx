import type { Metadata } from "next";
import AudienceCatalog from "@/components/AudienceCatalog";

export const metadata: Metadata = {
  title: "Men",
  description: "Men's football, running, basketball and training gear.",
};

export default function MenPage() {
  return <AudienceCatalog slug="men" />;
}
