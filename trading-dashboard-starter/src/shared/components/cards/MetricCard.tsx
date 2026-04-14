interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
}

export function MetricCard({ title, value, description }: MetricCardProps) {
  return (
    <div className="panel">
      <div className="muted">{title}</div>
      <div className="metric-card-value">{value}</div>
      {description ? <div className="muted">{description}</div> : null}
    </div>
  );
}
