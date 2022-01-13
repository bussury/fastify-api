import fastify from 'fastify'
import fastifyVite from 'fastify-vite'
import fastifyViteVue from 'fastify-vite-vue'
import fastifyApi from 'fastify-api'
import vite from 'vite'

import bootstrap from './bootstrap/app.js'


async function main() {
  const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
  })
  const root = import.meta.url
  
  await app.register(bootstrap)

  await app.register(fastifyApi)
  await app.register(fastifyVite, {
    root,
    renderer: fastifyViteVue
    // build: process.argv.includes('build'),
 
  })
  await app.vite.get('/*')
  await app.vite.commands()
  await app.vite.ready()
  /**
   * return fastify app
   */
  return app;
};

if (!process.argv.includes('test')) {
  const app = await main()
  const address = await app.listen(3000)
  console.log(`Listening at ${address}.`)
}

export default main
