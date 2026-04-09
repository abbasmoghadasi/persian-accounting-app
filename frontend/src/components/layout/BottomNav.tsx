import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Users,
  Settings,
} from 'lucide-react'
import './BottomNav.css'

const navItems = [
  { to: '/dashboard', label: 'داشبورد', Icon: LayoutDashboard },
  { to: '/transactions', label: 'تراکنش‌ها', Icon: ArrowLeftRight },
  { to: '/accounts', label: 'حساب‌ها', Icon: Wallet },
  { to: '/ledger', label: 'مراودات', Icon: Users },
  { to: '/settings', label: 'تنظیمات', Icon: Settings },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-nav-item${isActive ? ' bottom-nav-item--active' : ''}`
          }
        >
          <Icon size={22} strokeWidth={1.75} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
