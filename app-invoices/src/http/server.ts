import '../broker/subscriber.ts'

import { fastify } from 'fastify';
import  {fastifyCors} from '@fastify/cors';
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

app.listen({ host: '0.0.0.0', port: 3334 }).then(() => {
  console.log('[invoices] Server is running on http://localhost:3334');
})