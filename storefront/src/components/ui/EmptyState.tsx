export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <md-icon
        style={{ fontSize: "40px", color: "var(--md-sys-color-on-surface-variant)" }}
      >
        {icon}
      </md-icon>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {description && (
        <p
          className="max-w-sm text-sm"
          style={{ color: "var(--md-sys-color-on-surface-variant)" }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
