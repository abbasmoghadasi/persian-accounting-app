import { FastifyPluginAsync } from 'fastify'
import { LedgersService, CreateLedgerDto } from './ledgers.service'

const ledgersRoutes: FastifyPluginAsync = async (app) => {
  const service = new LedgersService()

  app.get('/', async () => service.findAll())

  app.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const ledger = service.findById(parseInt(req.params.id, 10))
    if (!ledger) return reply.status(404).send({ error: 'Ledger not found' })
    return ledger
  })

  app.post<{ Body: CreateLedgerDto }>('/', async (req, reply) => {
    const ledger = service.create(req.body)
    return reply.status(201).send(ledger)
  })
}

export default ledgersRoutes
