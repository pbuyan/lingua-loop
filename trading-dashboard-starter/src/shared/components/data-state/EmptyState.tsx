interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No data available.' }: EmptyStateProps) {
  return <div className="panel">{message}</div>;
}
