import { Outlet, useLocation } from 'react-router-dom'
import TopBar from '@/components/layout/TopBar'
import BottomNav from '@/components/layout/BottomNav'
import './AppShell.css'

const pageTitles: Record<string, string> = {
  '/dashboard': 'داشبورد',
  '/transactions': 'تراکنش‌ها',
  '/accounts': 'حساب‌ها',
  '/ledger': 'مراودات',
  '/settings': 'تنظیمات',
}

export default function AppShell() {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? ''

  return (
    <div className="app-shell">
      <TopBar title={title} />
      <main className="app-shell-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
