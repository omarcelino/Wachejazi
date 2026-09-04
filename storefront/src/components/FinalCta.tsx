export default function FinalCta() {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-3xl px-6 py-14 text-center"
      style={{
        background: "var(--md-sys-color-primary)",
        color: "var(--md-sys-color-on-primary)",
      }}
    >
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Ready for your next session?
      </h2>
      <p className="max-w-md text-sm opacity-90 sm:text-base">
        Find the gear for your next match, run or training session.
      </p>
      <md-filled-button
        class="h-11"
        href="/shop"
        style={{
          // Default filled-button is primary-on-primary — invert so it's
          // visible against this section's primary-colored background.
          "--md-filled-button-container-color": "var(--md-sys-color-on-primary)",
          "--md-filled-button-label-text-color": "var(--md-sys-color-primary)",
        } as React.CSSProperties}
      >
        Shop now
      </md-filled-button>
    </div>
  );
}
