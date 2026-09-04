export default function Rating({
  rating,
  reviewCount,
  size = 16,
  showCount = true,
}: {
  rating: number;
  reviewCount: number;
  size?: number;
  showCount?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const diff = rating - i;
          const icon = diff >= 0.75 ? "star" : diff >= 0.25 ? "star_half" : "star";
          const opacity = diff >= 0.25 ? 1 : 0.25;
          return (
            <md-icon
              key={i}
              style={{ fontSize: `${size}px`, color: "var(--md-sys-color-primary)", opacity }}
            >
              {icon}
            </md-icon>
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}
