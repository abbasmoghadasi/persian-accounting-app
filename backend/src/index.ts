import { buildApp } from './app'
import { env } from './config/env'
import { runMigrations } from './db/migrate'

async function start() {
  const app = await buildApp()

  runMigrations()

  try {
    await app.listen({ port: env.port, host: env.host })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
