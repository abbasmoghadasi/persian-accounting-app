import { FastifyPluginAsync } from 'fastify'
import { TransactionsService, CreateTransactionDto } from './transactions.service'

const transactionsRoutes: FastifyPluginAsync = async (app) => {
  const service = new TransactionsService()

  app.get('/', async () => service.findAll())

  app.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const tx = service.findById(parseInt(req.params.id, 10))
    if (!tx) return reply.status(404).send({ error: 'Transaction not found' })
    return tx
  })

  app.post<{ Body: CreateTransactionDto }>('/', async (req, reply) => {
    const tx = service.create(req.body)
    return reply.status(201).send(tx)
  })
}

export default transactionsRoutes
