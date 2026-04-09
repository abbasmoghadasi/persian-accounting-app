import { getDb } from '../../db/client'

export interface SmsLog {
  id: number
  raw_text: string
  sender: string | null
  parsed: number
  parsed_at: string | null
  created_at: string
}

export interface ParseSmsDto {
  raw_text: string
  sender?: string
}

export interface ParsedSmsResult {
  amount: number | null
  type: 'income' | 'expense' | null
  bank: string | null
  raw_text: string
}

export class SmsService {
  private db = getDb()

  findAll(): SmsLog[] {
    return this.db
      .prepare('SELECT * FROM sms_logs ORDER BY created_at DESC')
      .all() as SmsLog[]
  }

  parse(dto: ParseSmsDto): ParsedSmsResult {
    // Placeholder — real parsing logic will go here
    this.db
      .prepare('INSERT INTO sms_logs (raw_text, sender) VALUES (?, ?)')
      .run(dto.raw_text, dto.sender ?? null)

    return {
      amount: null,
      type: null,
      bank: null,
      raw_text: dto.raw_text,
    }
  }
}
