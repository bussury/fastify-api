import fastify from 'fastify'
import { Server, assert } from './core/index.js'
import { app, start }  from './config/index.js'
import logger from './logger.js'

import bootstrap from './bootstrap/app.js'



start().then(() => {
  return new Server({
    port: Number(app.port),
    host: app.host,
    controllers: app.controllers,
    logger
  })
}).then((serverParams) => {
  logger.info('Server initialized...', serverParams)
})

// async function main() {
//   const app = fastify({
//     logger: true,
//     ignoreTrailingSlash: true
//   })
//   // await app.register(bootstrap)

//   /**
//    * return fastify app
//    */
//   return app;
// };

// if (!process.argv.includes('test')) {
//   const app = await main()
//   const address = await app.listen({port: 3000})
//   console.log(`Listening at ${address}.`)
// }
// 
// export default main
