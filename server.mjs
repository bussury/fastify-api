import fastify from 'fastify'

import bootstrap from './bootstrap/app.js'


async function main() {
  const app = fastify({
    logger: true,
    ignoreTrailingSlash: true
  })
  const root = import.meta.url
  
  await app.register(bootstrap)

  // await app.register(fastifyVite, {
  //   root,
  //   renderer: fastifyViteVue
  //   // build: process.argv.includes('build'),
 
  // })

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
