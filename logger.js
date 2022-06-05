import { Logger } from './core/index.js'

const isDev = process.env.NODE_ENV === 'development'
const logger = new Logger({
  appName: 'fastify-api',
  raw: !isDev
})

export default logger