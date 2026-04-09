import 'dotenv/config'

export const env = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  host: process.env.HOST ?? '0.0.0.0',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  dbPath: process.env.DB_PATH ?? './data/accounting.db',
} as const
