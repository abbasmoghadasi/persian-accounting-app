import { getDb } from '../../db/client'

export interface Ledger {
  id: number
  title: string
  created_at: string
}

export interface CreateLedgerDto {
  title: string
}

export class LedgersService {
  private db = getDb()

  findAll(): Ledger[] {
    return this.db.prepare('SELECT * FROM ledgers ORDER BY created_at DESC').all() as Ledger[]
  }

  findById(id: number): Ledger | undefined {
    return this.db.prepare('SELECT * FROM ledgers WHERE id = ?').get(id) as Ledger | undefined
  }

  create(dto: CreateLedgerDto): Ledger {
    const result = this.db
      .prepare('INSERT INTO ledgers (title) VALUES (?)')
      .run(dto.title)

    return this.findById(result.lastInsertRowid as number)!
  }
}
