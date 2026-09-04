import type { Metadata } from "next";
import SigninPageClient from "./SigninPageClient";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default function SigninPage() {
  return <SigninPageClient />;
}
