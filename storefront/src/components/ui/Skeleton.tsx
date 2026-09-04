export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className}`}
      style={{ background: "var(--md-sys-color-surface-container-high)" }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col gap-3 rounded-3xl p-5"
      style={{ background: "var(--md-sys-color-surface-container-low)" }}
    >
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="mt-auto flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
