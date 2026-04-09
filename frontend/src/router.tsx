import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Dashboard from '@/pages/Dashboard'
import Transactions from '@/pages/Transactions'
import Accounts from '@/pages/Accounts'
import Ledger from '@/pages/Ledger'
import Settings from '@/pages/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'accounts', element: <Accounts /> },
      { path: 'ledger', element: <Ledger /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
])

export default router
