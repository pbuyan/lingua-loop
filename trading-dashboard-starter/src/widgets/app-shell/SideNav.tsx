import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/positions', label: 'Positions' },
  { to: '/orders', label: 'Orders' },
  { to: '/risk', label: 'Risk' },
  { to: '/settings', label: 'Settings' },
];

export function SideNav() {
  return (
    <nav className="nav-list">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
