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
}).catch((error) =>{
  stdout.write(error.stack)
  logger.error('Server fails to initialize...', error)
})
  .then(() => { Model.knex(knex(KnexConfig)) })
  .then(() => {
    logger.debug('--------------------------------')
    logger.debug(`Server listened at ${app.host}:${app.port}`)
    logger.debug('---------------------------------')
   })
