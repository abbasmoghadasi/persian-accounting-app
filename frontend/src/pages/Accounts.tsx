import { useState, useEffect, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { api } from '@/lib/api'
import type { Account, CreateAccountDto, UpdateAccountDto } from '@/types/account'
import AccountCard from '@/components/accounts/AccountCard'
import AccountForm from '@/components/accounts/AccountForm'
import './Accounts.css'

export default function Accounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [pageError, setPageError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)

  const loadAccounts = useCallback(async () => {
    setPageError(null)
    try {
      const data = await api.get<Account[]>('/accounts')
      setAccounts(data)
    } catch (err) {
      setPageError(err instanceof Error ? err.message : 'خطا در بارگذاری حساب‌ها')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAccounts()
  }, [loadAccounts])

  const handleCreate = async (dto: CreateAccountDto | UpdateAccountDto) => {
    await api.post<Account>('/accounts', dto)
    await loadAccounts()
    setShowForm(false)
  }

  const handleUpdate = async (dto: CreateAccountDto | UpdateAccountDto) => {
    if (!editingAccount) return
    await api.patch<Account>(`/accounts/${editingAccount.id}`, dto)
    await loadAccounts()
    closeForm()
  }

  const handleDelete = async (account: Account) => {
    if (!confirm(`حساب «${account.name}» حذف شود؟`)) return
    try {
      await api.delete(`/accounts/${account.id}`)
      await loadAccounts()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'خطا در حذف حساب')
    }
  }

  const openCreate = () => {
    setEditingAccount(null)
    setShowForm(true)
  }

  const openEdit = (account: Account) => {
    setEditingAccount(account)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingAccount(null)
  }

  return (
    <div className="accounts-page">
      <div className="accounts-page__header">
        <p className="accounts-page__count">
          {loading ? '' : `${accounts.length.toLocaleString('fa-IR')} حساب`}
        </p>
        <button className="accounts-page__add-btn" onClick={openCreate}>
          <Plus size={18} />
          افزودن حساب
        </button>
      </div>

      {loading && <p className="accounts-page__status">در حال بارگذاری...</p>}

      {pageError && <p className="accounts-page__status accounts-page__status--error">{pageError}</p>}

      {!loading && !pageError && accounts.length === 0 && (
        <div className="accounts-page__empty">
          <p>هنوز حسابی اضافه نشده است.</p>
          <button className="accounts-page__add-btn" onClick={openCreate}>
            <Plus size={18} />
            افزودن اولین حساب
          </button>
        </div>
      )}

      <div className="accounts-page__list">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showForm && (
        <AccountForm
          account={editingAccount}
          onSubmit={editingAccount ? handleUpdate : handleCreate}
          onCancel={closeForm}
        />
      )}
    </div>
  )
}
