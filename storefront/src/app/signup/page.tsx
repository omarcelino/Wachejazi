import type { Metadata } from "next";
import SignupPageClient from "./SignupPageClient";

export const metadata: Metadata = {
  title: "Create Account",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <SignupPageClient />;
}
