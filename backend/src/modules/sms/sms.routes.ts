import { FastifyPluginAsync } from 'fastify'
import { SmsService, ParseSmsDto } from './sms.service'

const smsRoutes: FastifyPluginAsync = async (app) => {
  const service = new SmsService()

  app.get('/', async () => service.findAll())

  app.post<{ Body: ParseSmsDto }>('/parse', async (req, reply) => {
    const result = service.parse(req.body)
    return reply.status(200).send(result)
  })
}

export default smsRoutes
