interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 text-6xl opacity-50">📦</div>
      <h3 className="text-xl font-semibold text-[#EAF6EE] mb-2">{title}</h3>
      {description && (
        <p className="text-[#A3C6B1] max-w-md">{description}</p>
      )}
    </div>
  );
}
