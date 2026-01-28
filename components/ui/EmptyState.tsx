interface EmptyStateProps {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-4 text-6xl opacity-50">📦</div>
      <h3 className="mb-2 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {description && (
        <p className="max-w-md" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      )}
    </div>
  );
}
