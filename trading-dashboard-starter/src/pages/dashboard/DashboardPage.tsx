import { PageHeader } from '@/shared/components/page-header/PageHeader';
import { MetricCard } from '@/shared/components/cards/MetricCard';

export function DashboardPage() {
  return (
    <div className="page-grid">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of portfolio metrics, market moves, and operational alerts"
      />
      <section className="metrics-grid">
        <MetricCard title="Net Exposure" value="$24.8M" description="Across all active books" />
        <MetricCard title="Daily PnL" value="+$142K" description="Refreshed every 15 seconds" />
        <MetricCard title="Open Orders" value="37" description="Pending and partially filled" />
        <MetricCard title="Risk Alerts" value="3" description="Threshold breaches to review" />
      </section>
    </div>
  );
}
