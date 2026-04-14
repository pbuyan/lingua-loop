import { useUiStore } from '@/app/store/ui.store';
import { usePositionsUiStore } from '@/features/positions/model/positions.store';
import { usePositions } from '@/features/positions/hooks/usePositions';
import { positionsColumnDefs } from '@/features/positions/grid/positions.column-defs';
import { positionsDefaultColDef } from '@/features/positions/grid/positions.default-col-def';
import { LoadingState } from '@/shared/components/data-state/LoadingState';
import { ErrorState } from '@/shared/components/data-state/ErrorState';
import { EmptyState } from '@/shared/components/data-state/EmptyState';
import { DataGrid } from '@/shared/components/grid/DataGrid';

export function PositionsGrid() {
  const portfolioId = useUiStore((state) => state.selectedPortfolioId);
  const symbol = usePositionsUiStore((state) => state.symbolFilter);

  const { data, isLoading, isError, error } = usePositions({
    portfolioId: portfolioId ?? undefined,
    symbol,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message={error instanceof Error ? error.message : undefined} />;
  if (!data?.length) return <EmptyState message="No positions match the current filters." />;

  return <DataGrid rowData={data} columnDefs={positionsColumnDefs} defaultColDef={positionsDefaultColDef} />;
}
