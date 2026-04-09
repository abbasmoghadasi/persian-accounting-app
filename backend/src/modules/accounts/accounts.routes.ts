import { FastifyPluginAsync } from 'fastify'
import { AccountsService, CreateAccountDto } from './accounts.service'

const accountsRoutes: FastifyPluginAsync = async (app) => {
  const service = new AccountsService()

  app.get('/', async () => service.findAll())

  app.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const account = service.findById(parseInt(req.params.id, 10))
    if (!account) return reply.status(404).send({ error: 'Account not found' })
    return account
  })

  app.post<{ Body: CreateAccountDto }>('/', async (req, reply) => {
    const account = service.create(req.body)
    return reply.status(201).send(account)
  })
}

export default accountsRoutes
