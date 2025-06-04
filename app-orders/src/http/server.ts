import { fastify } from 'fastify';
import  {fastifyCors} from '@fastify/cors';
import { z } from 'zod';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'ok'
})

// Escalonamento Horizontal

app.post('/orders', {
  schema: {
    body: z.object({
      amount: z.number()
  })
 },
},
  (request, reply) => {

  console.log('Creating an order with amount:')
  

  return reply.status(201).send()
});

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('[orders] Server is running on http://localhost:3333');
})