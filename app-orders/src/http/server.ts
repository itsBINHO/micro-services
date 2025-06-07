import { channels } from '../broker/channels/index.ts';
import { randomUUID } from 'node:crypto'
import { fastify } from 'fastify';
import  {fastifyCors} from '@fastify/cors';
import { z } from 'zod';
import { schema } from '../db/schema/index.ts'
import { db } from '../db/client.ts'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, { origin: '*'})

app.get('/health', () => {
  return 'ok'
})

// Escalonamento Horizontal

app.post('/orders', {
  schema: {
    body: z.object({
      amount: z.coerce.number()
  })
 },
},

 
  async (request, reply) => {
  const { amount } = request.body

  console.log('Creating an order with amount:')

  channels.orders.sendToQueue('orders', Buffer.from(JSON.stringify({ amount })))

  await db.insert(schema.orders).values({
    id: randomUUID(),
    customerId: '1634634-63416346-63613464131-6134634163',
    amount,

  })

  return reply.status(201).send()
});

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('[orders] Server is running on http://localhost:3333');
})