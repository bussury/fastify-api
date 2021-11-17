// import fastify from 'fastify'
// import fastifyVite from 'fastify-vite'
// import fastifyViteVue from 'fastify-vite-vue'
// import fastifyApi from 'fastify-api'
// import { dirname, join} from 'path'

const fastify = require('fastify')
const fastifyVite = require('fastify-vite')
const fastifyViteVue = require('fastify-vite-vue')
const fastifyApi = require('fastify-api')


// import bootstrap from './bootstrap/app.js'
const bootstrap = require('./bootstrap/app.js')




async function main() {

  const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
  })
  // const root = import.meta.url
  
  await app.register(bootstrap)

  await app.register(fastifyApi)
  await app.register(fastifyVite, {
    api: true,
    root: __dirname,
    renderer: fastifyViteVue,
    // build: process.argv.includes('build'),
  })

  await app.vite.ready()
  /**
   * return fastify app
   */
  return app;
};
if (require.main === module) {
  main().then(app => {
    app.listen(3000, (err, address) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening on ${address}`)
    })
  })
}


// export default main
module.exports = main
