import { getDb } from '../../db/client'

export interface Transaction {
  id: number
  account_id: number
  amount: number
  type: 'income' | 'expense'
  description: string | null
  date: string
  created_at: string
}

export interface CreateTransactionDto {
  account_id: number
  amount: number
  type: 'income' | 'expense'
  description?: string
  date: string
}

export class TransactionsService {
  private db = getDb()

  findAll(): Transaction[] {
    return this.db
      .prepare('SELECT * FROM transactions ORDER BY date DESC, created_at DESC')
      .all() as Transaction[]
  }

  findByAccount(accountId: number): Transaction[] {
    return this.db
      .prepare('SELECT * FROM transactions WHERE account_id = ? ORDER BY date DESC')
      .all(accountId) as Transaction[]
  }

  findById(id: number): Transaction | undefined {
    return this.db
      .prepare('SELECT * FROM transactions WHERE id = ?')
      .get(id) as Transaction | undefined
  }

  create(dto: CreateTransactionDto): Transaction {
    const result = this.db
      .prepare(
        'INSERT INTO transactions (account_id, amount, type, description, date) VALUES (?, ?, ?, ?, ?)'
      )
      .run(dto.account_id, dto.amount, dto.type, dto.description ?? null, dto.date)

    return this.findById(result.lastInsertRowid as number)!
  }
}
