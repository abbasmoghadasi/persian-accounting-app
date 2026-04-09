import { getDb } from '../../db/client'

export interface Account {
  id: number
  name: string
  type: string
  balance: number
  created_at: string
}

export interface CreateAccountDto {
  name: string
  type: string
  balance?: number
}

export class AccountsService {
  private db = getDb()

  findAll(): Account[] {
    return this.db.prepare('SELECT * FROM accounts ORDER BY created_at DESC').all() as Account[]
  }

  findById(id: number): Account | undefined {
    return this.db.prepare('SELECT * FROM accounts WHERE id = ?').get(id) as Account | undefined
  }

  create(dto: CreateAccountDto): Account {
    const result = this.db
      .prepare('INSERT INTO accounts (name, type, balance) VALUES (?, ?, ?)')
      .run(dto.name, dto.type, dto.balance ?? 0)

    return this.findById(result.lastInsertRowid as number)!
  }
}
