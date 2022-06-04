import fastify from 'fastify'
import { Server, assert } from './core/index.js'

import bootstrap from './bootstrap/app.js'


async function main() {
  const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
  })
  await app.register(bootstrap)

  /**
   * return fastify app
   */
  return app;
};

if (!process.argv.includes('test')) {
  const app = await main()
  const address = await app.listen({port: 3000})
  console.log(`Listening at ${address}.`)
}

export default main
