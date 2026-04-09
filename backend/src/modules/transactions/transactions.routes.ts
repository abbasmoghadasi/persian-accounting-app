import { FastifyPluginAsync } from 'fastify'
import { AppError } from '../../lib/errors'
import { success } from '../../lib/response'
import { TransactionsService, CreateTransactionDto } from './transactions.service'

const transactionsRoutes: FastifyPluginAsync = async (app) => {
  const service = new TransactionsService()

  app.get('/', async (_req, reply) => {
    return reply.send(success(service.findAll()))
  })

  app.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const tx = service.findById(parseInt(req.params.id, 10))
    if (!tx) throw new AppError(404, 'Transaction not found')
    return reply.send(success(tx))
  })

  app.post<{ Body: CreateTransactionDto }>('/', async (req, reply) => {
    const tx = service.create(req.body)
    return reply.status(201).send(success(tx))
  })
}

export default transactionsRoutes
