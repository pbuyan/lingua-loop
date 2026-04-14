import { usePositionsFilters } from '@/features/positions/hooks/usePositionsFilters';
import { useUiStore } from '@/app/store/ui.store';

export function PositionsToolbar() {
  const selectedPortfolioId = useUiStore((state) => state.selectedPortfolioId);
  const { symbolFilter, onSymbolFilterChange } = usePositionsFilters();

  return (
    <section className="panel toolbar">
      <div>
        <div className="muted">Portfolio</div>
        <strong>{selectedPortfolioId}</strong>
      </div>
      <input
        className="input"
        placeholder="Filter by symbol"
        value={symbolFilter}
        onChange={onSymbolFilterChange}
      />
    </section>
  );
}
