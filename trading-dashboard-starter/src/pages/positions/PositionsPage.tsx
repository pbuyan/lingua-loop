import { PageHeader } from '@/shared/components/page-header/PageHeader';
import { PositionsToolbar } from '@/features/positions/components/PositionsToolbar';
import { PositionsGrid } from '@/features/positions/components/PositionsGrid';

export function PositionsPage() {
  return (
    <div className="page-grid">
      <PageHeader title="Positions" subtitle="Current portfolio positions and market values" />
      <PositionsToolbar />
      <PositionsGrid />
    </div>
  );
}
