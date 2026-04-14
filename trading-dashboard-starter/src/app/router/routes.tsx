import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/widgets/app-shell/AppShell';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { PositionsPage } from '@/pages/positions/PositionsPage';
import { OrdersPage } from '@/pages/orders/OrdersPage';
import { RiskPage } from '@/pages/risk/RiskPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { NotFoundPage } from '@/pages/not-found/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'positions', element: <PositionsPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'risk', element: <RiskPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
