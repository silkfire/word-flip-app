import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyCompress from '@fastify/compress'

import { getLastSentencesRequest, flipRequest } from './apiMethods.js'

const isDev = process.env.NODE_ENV !== 'production'

const fastify = Fastify({
  disableRequestLogging: true,
  logger: isDev ? {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  } : true
})

const distDirectory = join(dirname(fileURLToPath(import.meta.url)), 'dist')

// Register plugins
fastify.register(fastifyCompress)
fastify.register(fastifyStatic, {
  root: distDirectory
})

// API Routes
fastify.get('/getLastSentences', getLastSentencesRequest)
fastify.post('/flip', flipRequest)

// Start server
try {
  const port = process.env.PORT || 3000
  const host = process.env.HOST || '127.0.0.1'
  fastify.listen({ port, host })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
