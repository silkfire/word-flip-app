import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyCompress from '@fastify/compress'

const fastify = Fastify({
  disableRequestLogging: true,
  logger: true
})

const distDirectory = join(dirname(fileURLToPath(import.meta.url)), 'dist')

// Register plugins
fastify.register(fastifyCompress)
fastify.register(fastifyStatic, {
  root: distDirectory
})

// Start server
try {
  const port = import.meta.env.PORT || 3000
  const host = import.meta.env.HOST || '127.0.0.1'
  fastify.listen({ port, host })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
