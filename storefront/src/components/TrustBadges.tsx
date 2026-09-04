const BADGES = [
  {
    icon: "verified",
    label: "M-Pesa, card or cash on delivery",
  },
  {
    icon: "local_shipping",
    label: "Nairobi delivery in 1–2 days",
  },
  {
    icon: "replay",
    label: "Free returns within the item's window",
  },
];

export default function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-3 ${className}`}>
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{ background: "var(--md-sys-color-surface-container)" }}
        >
          <md-icon style={{ color: "var(--md-sys-color-primary)" }}>{badge.icon}</md-icon>
          <span className="text-sm">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
