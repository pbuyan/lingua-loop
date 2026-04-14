import { useUiStore } from '@/app/store/ui.store';

export function AppHeader() {
  const selectedPortfolioId = useUiStore((state) => state.selectedPortfolioId);

  return (
    <header className="app-header toolbar">
      <div>
        <strong>Trading Dashboard</strong>
        <div className="muted">Portfolio: {selectedPortfolioId ?? 'Not selected'}</div>
      </div>
      <div className="muted">Campfire-ready shell placeholder</div>
    </header>
  );
}
