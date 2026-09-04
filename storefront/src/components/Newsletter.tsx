"use client";

import { useRef, useState } from "react";

type TextFieldElement = HTMLElement & { value: string };

export default function Newsletter() {
  const emailRef = useRef<TextFieldElement>(null);
  const [submitted, setSubmitted] = useState(false);

  function subscribe() {
    if (!emailRef.current?.value.trim()) return;
    setSubmitted(true);
  }

  return (
    <div
      className="flex flex-col items-start gap-4 rounded-2xl px-6 py-8 sm:flex-row sm:items-center sm:justify-between"
      style={{
        background: "var(--md-sys-color-primary-container)",
        color: "var(--md-sys-color-on-primary-container)",
      }}
    >
      <div className="flex items-start gap-3">
        <md-icon style={{ fontSize: "28px" }}>mail</md-icon>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Get restock alerts and new arrivals by email
          </h2>
          <p className="mt-1 text-sm opacity-90">
            Hear about grip socks and other consumables before you run out.
          </p>
        </div>
      </div>

      {submitted ? (
        <p className="flex items-center gap-2 text-sm font-medium">
          <md-icon style={{ fontSize: "18px" }}>check_circle</md-icon>
          You&apos;re on the list.
        </p>
      ) : (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <md-outlined-text-field
            ref={emailRef}
            label="Email address"
            type="email"
          />
          <md-filled-button onClick={subscribe}>
            <md-icon slot="icon">mail</md-icon>
            Subscribe
          </md-filled-button>
        </div>
      )}
    </div>
  );
}
