import fastify from 'fastify'
import fastifyVite from 'fastify-vite'
import fastifyViteVue from 'fastify-vite-vue'
import fastifyApi from 'fastify-api'
import { dirname, join} from 'path'

import bootstrap from './bootstrap/app.js'


const __filename = process.cwd()+ '/will be removed by dirname'
const __dirname = dirname(__filename)


async function main() {

  const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
  })
  
  await app.register(bootstrap)

  await app.register(fastifyApi)
  await app.register(fastifyVite, {
    api: true,
    root: __dirname,
    renderer: fastifyViteVue,
    build: process.argv.includes('build'),
  })

  await app.vite.ready()
  /**
   * return fastify app
   */
  return app;
};

main().then(app => {
  app.listen(3000, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening on ${address}`)
  })
})


export default main


