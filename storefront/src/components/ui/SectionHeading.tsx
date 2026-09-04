export default function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}
