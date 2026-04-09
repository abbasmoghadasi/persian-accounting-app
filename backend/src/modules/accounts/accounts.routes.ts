import { FastifyPluginAsync } from 'fastify'
import { AppError } from '../../lib/errors'
import { success } from '../../lib/response'
import { AccountsService, CreateAccountDto } from './accounts.service'

const accountsRoutes: FastifyPluginAsync = async (app) => {
  const service = new AccountsService()

  app.get('/', async (_req, reply) => {
    return reply.send(success(service.findAll()))
  })

  app.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const account = service.findById(parseInt(req.params.id, 10))
    if (!account) throw new AppError(404, 'Account not found')
    return reply.send(success(account))
  })

  app.post<{ Body: CreateAccountDto }>('/', async (req, reply) => {
    const account = service.create(req.body)
    return reply.status(201).send(success(account))
  })
}

export default accountsRoutes
