import { getDb } from '../../db/client'
import { AppError } from '../../lib/errors'

export const ACCOUNT_TYPES = ['cash', 'bank', 'credit', 'savings'] as const
export const ACCOUNT_CURRENCIES = ['IRR', 'USD', 'EUR'] as const

export type AccountType = (typeof ACCOUNT_TYPES)[number]
export type AccountCurrency = (typeof ACCOUNT_CURRENCIES)[number]

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
  initial_balance?: number
}

export interface UpdateAccountDto {
  name?: string
  type?: AccountType
  currency?: AccountCurrency
  initial_balance?: number
}

export class AccountsService {
  private db = getDb()

  findAll(): Account[] {
    return this.db
      .prepare('SELECT * FROM accounts ORDER BY created_at DESC')
      .all() as Account[]
  }

  findById(id: number): Account | undefined {
    return this.db
      .prepare('SELECT * FROM accounts WHERE id = ?')
      .get(id) as Account | undefined
  }

  create(dto: CreateAccountDto): Account {
    this.validateCreate(dto)

    const result = this.db
      .prepare(
        'INSERT INTO accounts (name, type, currency, initial_balance) VALUES (?, ?, ?, ?)',
      )
      .run(dto.name.trim(), dto.type, dto.currency, dto.initial_balance ?? 0)

    return this.findById(result.lastInsertRowid as number)!
  }

  update(id: number, dto: UpdateAccountDto): Account {
    const account = this.findById(id)
    if (!account) throw new AppError(404, 'Account not found')

    this.validateUpdate(dto)

    const fields: string[] = []
    const values: (string | number)[] = []

    if (dto.name !== undefined) {
      fields.push('name = ?')
      values.push(dto.name.trim())
    }
    if (dto.type !== undefined) {
      fields.push('type = ?')
      values.push(dto.type)
    }
    if (dto.currency !== undefined) {
      fields.push('currency = ?')
      values.push(dto.currency)
    }
    if (dto.initial_balance !== undefined) {
      fields.push('initial_balance = ?')
      values.push(dto.initial_balance)
    }

    if (fields.length === 0) throw new AppError(400, 'No fields to update')

    values.push(id)
    this.db.prepare(`UPDATE accounts SET ${fields.join(', ')} WHERE id = ?`).run(...values)

    return this.findById(id)!
  }

  delete(id: number): void {
    const account = this.findById(id)
    if (!account) throw new AppError(404, 'Account not found')
    this.db.prepare('DELETE FROM accounts WHERE id = ?').run(id)
  }

  private validateCreate(dto: CreateAccountDto): void {
    if (!dto.name?.trim()) {
      throw new AppError(400, 'Name is required', 'VALIDATION_ERROR')
    }
    if (!ACCOUNT_TYPES.includes(dto.type)) {
      throw new AppError(400, `Type must be one of: ${ACCOUNT_TYPES.join(', ')}`, 'VALIDATION_ERROR')
    }
    if (!ACCOUNT_CURRENCIES.includes(dto.currency)) {
      throw new AppError(400, `Currency must be one of: ${ACCOUNT_CURRENCIES.join(', ')}`, 'VALIDATION_ERROR')
    }
    if (dto.initial_balance !== undefined && typeof dto.initial_balance !== 'number') {
      throw new AppError(400, 'Initial balance must be a number', 'VALIDATION_ERROR')
    }
  }

  private validateUpdate(dto: UpdateAccountDto): void {
    if (dto.name !== undefined && !dto.name.trim()) {
      throw new AppError(400, 'Name cannot be empty', 'VALIDATION_ERROR')
    }
    if (dto.type !== undefined && !ACCOUNT_TYPES.includes(dto.type)) {
      throw new AppError(400, `Type must be one of: ${ACCOUNT_TYPES.join(', ')}`, 'VALIDATION_ERROR')
    }
    if (dto.currency !== undefined && !ACCOUNT_CURRENCIES.includes(dto.currency)) {
      throw new AppError(400, `Currency must be one of: ${ACCOUNT_CURRENCIES.join(', ')}`, 'VALIDATION_ERROR')
    }
    if (dto.initial_balance !== undefined && typeof dto.initial_balance !== 'number') {
      throw new AppError(400, 'Initial balance must be a number', 'VALIDATION_ERROR')
    }
  }
}
