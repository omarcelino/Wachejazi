import type { Metadata } from "next";
import AudienceCatalog from "@/components/AudienceCatalog";

export const metadata: Metadata = {
  title: "Kids",
  description: "Kids' boots, jerseys and training gear.",
};

export default function KidsPage() {
  return <AudienceCatalog slug="kids" />;
}
