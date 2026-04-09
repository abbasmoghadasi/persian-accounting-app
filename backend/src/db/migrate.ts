import { getDb } from './client'

export function runMigrations(): void {
  const db = getDb()

  db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      type        TEXT    NOT NULL,
      balance     REAL    NOT NULL DEFAULT 0,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id  INTEGER NOT NULL REFERENCES accounts(id),
      amount      REAL    NOT NULL,
      type        TEXT    NOT NULL CHECK (type IN ('income', 'expense')),
      description TEXT,
      date        TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ledgers (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ledger_entries (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      ledger_id   INTEGER NOT NULL REFERENCES ledgers(id),
      amount      REAL    NOT NULL,
      description TEXT,
      paid_by     TEXT    NOT NULL,
      date        TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sms_logs (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      raw_text    TEXT    NOT NULL,
      sender      TEXT,
      parsed      INTEGER NOT NULL DEFAULT 0,
      parsed_at   TEXT,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `)
}
