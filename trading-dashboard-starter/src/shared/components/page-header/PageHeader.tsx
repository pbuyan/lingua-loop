interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <h1 style={{ margin: 0 }}>{title}</h1>
      {subtitle ? <p className="muted" style={{ marginTop: 8 }}>{subtitle}</p> : null}
    </div>
  );
}
