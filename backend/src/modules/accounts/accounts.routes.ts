import { FastifyPluginAsync } from 'fastify'
import { AppError } from '../../lib/errors'
import { success } from '../../lib/response'
import { AccountsService, CreateAccountDto, UpdateAccountDto } from './accounts.service'

const accountsRoutes: FastifyPluginAsync = async (app) => {
  const service = new AccountsService()

  app.get('/', async (_req, reply) => {
    return reply.send(success(service.findAll()))
  })

  app.post<{ Body: CreateAccountDto }>('/', async (req, reply) => {
    const account = service.create(req.body)
    return reply.status(201).send(success(account))
  })

  app.patch<{ Params: { id: string }; Body: UpdateAccountDto }>('/:id', async (req, reply) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) throw new AppError(400, 'Invalid account ID')
    const account = service.update(id, req.body)
    return reply.send(success(account))
  })

  app.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) throw new AppError(400, 'Invalid account ID')
    service.delete(id)
    return reply.send(success(null))
  })
}

export default accountsRoutes
