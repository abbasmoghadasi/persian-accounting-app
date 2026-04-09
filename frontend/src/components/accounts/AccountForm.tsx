import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { Account, CreateAccountDto, UpdateAccountDto } from '@/types/account'
import { ACCOUNT_TYPE_LABELS, ACCOUNT_CURRENCY_LABELS } from '@/types/account'
import './AccountForm.css'

interface AccountFormProps {
  account: Account | null
  onSubmit: (data: CreateAccountDto | UpdateAccountDto) => Promise<void>
  onCancel: () => void
}

const defaultForm: CreateAccountDto = {
  name: '',
  type: 'cash',
  currency: 'IRR',
  initial_balance: 0,
}

export default function AccountForm({ account, onSubmit, onCancel }: AccountFormProps) {
  const [form, setForm] = useState<CreateAccountDto>(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEditing = account !== null

  useEffect(() => {
    if (account) {
      setForm({
        name: account.name,
        type: account.type,
        currency: account.currency,
        initial_balance: account.initial_balance,
      })
    } else {
      setForm(defaultForm)
    }
    setError(null)
  }, [account])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name.trim()) {
      setError('نام حساب الزامی است.')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطای ناشناخته')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="account-form-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="account-form-modal">
        <div className="account-form-modal__header">
          <h2 className="account-form-modal__title">
            {isEditing ? 'ویرایش حساب' : 'افزودن حساب جدید'}
          </h2>
          <button className="account-form-modal__close" onClick={onCancel} aria-label="بستن">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="account-form">
          <div className="account-form__field">
            <label className="account-form__label">نام حساب</label>
            <input
              className="account-form__input"
              type="text"
              placeholder="مثال: حساب ملت"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              autoFocus
            />
          </div>

          <div className="account-form__field">
            <label className="account-form__label">نوع حساب</label>
            <select
              className="account-form__select"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CreateAccountDto['type'] }))}
            >
              {Object.entries(ACCOUNT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="account-form__field">
            <label className="account-form__label">واحد پول</label>
            <select
              className="account-form__select"
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value as CreateAccountDto['currency'] }))}
            >
              {Object.entries(ACCOUNT_CURRENCY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="account-form__field">
            <label className="account-form__label">موجودی اولیه</label>
            <input
              className="account-form__input"
              type="number"
              placeholder="۰"
              value={form.initial_balance}
              onChange={(e) => setForm((f) => ({ ...f, initial_balance: parseFloat(e.target.value) || 0 }))}
              min={0}
              step="any"
            />
          </div>

          {error && <p className="account-form__error">{error}</p>}

          <div className="account-form__actions">
            <button type="button" className="account-form__btn account-form__btn--cancel" onClick={onCancel}>
              انصراف
            </button>
            <button type="submit" className="account-form__btn account-form__btn--submit" disabled={submitting}>
              {submitting ? 'در حال ذخیره...' : isEditing ? 'ذخیره تغییرات' : 'افزودن حساب'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
