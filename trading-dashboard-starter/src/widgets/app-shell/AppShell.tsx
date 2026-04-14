import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/widgets/app-shell/AppHeader';
import { SideNav } from '@/widgets/app-shell/SideNav';

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <h2>TradeView</h2>
        <p className="muted">Financial dashboard starter</p>
        <SideNav />
      </aside>
      <div className="app-main">
        <AppHeader />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
