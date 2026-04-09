import { FastifyPluginAsync } from 'fastify'
import { success } from '../../lib/response'
import { SmsService, ParseSmsDto } from './sms.service'

const smsRoutes: FastifyPluginAsync = async (app) => {
  const service = new SmsService()

  app.get('/', async (_req, reply) => {
    return reply.send(success(service.findAll()))
  })

  app.post<{ Body: ParseSmsDto }>('/parse', async (req, reply) => {
    const result = service.parse(req.body)
    return reply.status(200).send(success(result))
  })
}

export default smsRoutes
