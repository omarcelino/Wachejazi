"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { EASE_EMPHASIZED_DECELERATE, EASE_STANDARD } from "@/lib/motion";

type TextFieldElement = HTMLElement & { value: string };

export default function SigninPageClient() {
  const identifierRef = useRef<TextFieldElement>(null);
  const passwordRef = useRef<TextFieldElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  function signIn() {
    const identifier = identifierRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!identifier || !password) {
      setError("Enter your email or phone and your password to continue.");
      return;
    }
    setError(null);
    setSignedIn(true);
  }

  if (signedIn) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pb-24 pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_EMPHASIZED_DECELERATE }}
          >
            <md-icon style={{ fontSize: "48px", color: "var(--md-sys-color-primary)" }}>
              check_circle
            </md-icon>
          </motion.div>
          <motion.h1
            className="mt-4 text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: EASE_EMPHASIZED_DECELERATE }}
          >
            Welcome back!
          </motion.h1>
          <motion.p
            className="mt-2 text-base"
            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: EASE_EMPHASIZED_DECELERATE }}
          >
            Your saved sizes and past orders are ready.
          </motion.p>
          <div className="mt-8">
            <md-filled-button href="/">Continue shopping</md-filled-button>
          </div>
        </main>
        <Footer />
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-24 pt-8">
        <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          Track orders, saved sizes and a faster checkout.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <md-outlined-text-field ref={identifierRef} label="Email or phone number" />
          <md-outlined-text-field ref={passwordRef} label="Password" type="password" />
        </div>

        {error && (
          <motion.p
            className="mt-4 text-sm"
            style={{ color: "var(--md-sys-color-error)" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: EASE_STANDARD }}
          >
            {error}
          </motion.p>
        )}

        <div className="mt-6">
          <md-filled-button onClick={signIn}>Sign in</md-filled-button>
        </div>

        <p
          className="mt-6 text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          New to Wachejazi?{" "}
          <Link href="/signup" style={{ color: "var(--md-sys-color-primary)" }}>
            Create an account
          </Link>
          .
        </p>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          Just here for one order?{" "}
          <Link href="/cart" style={{ color: "var(--md-sys-color-primary)" }}>
            Check out as a guest
          </Link>
          , no account needed.
        </p>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
