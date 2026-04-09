export type AccountType = 'cash' | 'bank' | 'credit' | 'savings'
export type AccountCurrency = 'IRR' | 'USD' | 'EUR'

export interface Account {
  id: number
  name: string
  type: AccountType
  currency: AccountCurrency
  initial_balance: number
  created_at: string
}

export interface CreateAccountDto {
  name: string
  type: AccountType
  currency: AccountCurrency
  initial_balance: number
}

export interface UpdateAccountDto {
  name?: string
  type?: AccountType
  currency?: AccountCurrency
  initial_balance?: number
}

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  cash: 'نقدی',
  bank: 'بانکی',
  credit: 'اعتباری',
  savings: 'پس‌انداز',
}

export const ACCOUNT_CURRENCY_LABELS: Record<AccountCurrency, string> = {
  IRR: 'ریال',
  USD: 'دلار',
  EUR: 'یورو',
}
