import knex from 'knex'
import { Model } from 'objection'
import { Server, assert } from './core/index.js'
import { app, start, knex as KnexConfig }  from './config/index.js'
import logger from './logger.js'


start().then(() => {
  return new Server({
    port: Number(app.port),
    host: app.host,
    controllers: app.controllers,
    logger
  })
}).then((serverParams) => {
  logger.info('Server initialized...', serverParams)
  logger.debug('--- APP CONFIG ---')
  logger.debug(`HOST: ${app.host}`)
  logger.debug(`PORT: ${app.port}`)
  logger.debug(`NAME: ${app.name}`)
}).catch((error) =>{
  stdout.write(error.stack)
  logger.error('Server fails to initialize...', error)
})
  .then(() => { Model.knex(knex(KnexConfig)) })
  .then(() => { 
    logger.debug('Database initialized...')
    logger.debug('--- SQL DATABASE CONFIG ---')
    logger.debug(`CLIENT: ${KnexConfig.client}`)
    logger.debug(`USER: ${KnexConfig.connection.user}`)
    logger.debug(`HOST: ${KnexConfig.connection.host}`)
    logger.debug(`PORT: ${KnexConfig.connection.port}`)
    logger.debug(`DATABASE: ${KnexConfig.connection.database}`)
  })
  .then(() => {
    logger.debug('---------')
    logger.debug(`Server listened at ${app.host}:${app.port}`)
    logger.debug('---------')
   })

// if (!process.argv.includes('test')) {
//   const app = await main()
//   const address = await app.listen({port: 3000})
//   console.log(`Listening at ${address}.`)
// }
// 
// export default main
