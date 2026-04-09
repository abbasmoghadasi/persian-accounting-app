import { Pencil, Trash2 } from 'lucide-react'
import type { Account } from '@/types/account'
import { ACCOUNT_TYPE_LABELS, ACCOUNT_CURRENCY_LABELS } from '@/types/account'
import './AccountCard.css'

interface AccountCardProps {
  account: Account
  onEdit: (account: Account) => void
  onDelete: (account: Account) => void
}

export default function AccountCard({ account, onEdit, onDelete }: AccountCardProps) {
  const formattedBalance = account.initial_balance.toLocaleString('fa-IR')
  const currency = ACCOUNT_CURRENCY_LABELS[account.currency]
  const typeLabel = ACCOUNT_TYPE_LABELS[account.type]

  return (
    <div className={`account-card account-card--${account.type}`}>
      <div className="account-card__body">
        <span className="account-card__type-badge">{typeLabel}</span>
        <p className="account-card__name">{account.name}</p>
        <p className="account-card__balance">
          {formattedBalance}
          <span className="account-card__currency"> {currency}</span>
        </p>
      </div>
      <div className="account-card__actions">
        <button
          className="account-card__btn account-card__btn--edit"
          onClick={() => onEdit(account)}
          aria-label="ویرایش"
        >
          <Pencil size={16} />
        </button>
        <button
          className="account-card__btn account-card__btn--delete"
          onClick={() => onDelete(account)}
          aria-label="حذف"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}
