import { FastifyPluginAsync } from 'fastify'
import { AppError } from '../../lib/errors'
import { success } from '../../lib/response'
import { LedgersService, CreateLedgerDto } from './ledgers.service'

const ledgersRoutes: FastifyPluginAsync = async (app) => {
  const service = new LedgersService()

  app.get('/', async (_req, reply) => {
    return reply.send(success(service.findAll()))
  })

  app.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const ledger = service.findById(parseInt(req.params.id, 10))
    if (!ledger) throw new AppError(404, 'Ledger not found')
    return reply.send(success(ledger))
  })

  app.post<{ Body: CreateLedgerDto }>('/', async (req, reply) => {
    const ledger = service.create(req.body)
    return reply.status(201).send(success(ledger))
  })
}

export default ledgersRoutes
