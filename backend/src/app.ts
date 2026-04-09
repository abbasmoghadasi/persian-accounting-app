import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { env } from './config/env'
import accountsRoutes from './modules/accounts/accounts.routes'
import transactionsRoutes from './modules/transactions/transactions.routes'
import ledgersRoutes from './modules/ledgers/ledgers.routes'
import smsRoutes from './modules/sms/sms.routes'

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: env.nodeEnv === 'development',
  })

  await app.register(cors, { origin: true })

  await app.register(accountsRoutes, { prefix: '/api/accounts' })
  await app.register(transactionsRoutes, { prefix: '/api/transactions' })
  await app.register(ledgersRoutes, { prefix: '/api/ledgers' })
  await app.register(smsRoutes, { prefix: '/api/sms' })

  app.get('/api/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  }))

  return app
}
