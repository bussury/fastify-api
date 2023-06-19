import knex from 'knex'
import { Model } from 'objection'
import { Server } from './core/index.js'
import { app, start, knex as KnexConfig }  from './plugins/index.js'
import controllers from './app/http/Controllers/Controller.js'
import Middleware from './app/http/Middleware/index.js'
import logger from './logger.js'


start()
    .then(() => {
      return new Server({
        port: Number(app.port),
        host: app.host,
        controllers: controllers,
        middlewares: Middleware,
        logger
      })
    })
    .then((serverParams) => {
      logger.info('Server initialized...', serverParams)
    }).catch((error) =>{
      // stdout.write(error.stack)
      logger.error('Server fails to initialize...', error)
    })
  .then(() => { Model.knex(knex(KnexConfig)) })
  .then(() => {
    logger.debug('--------------------------------')
    logger.debug(`Server listened at ${app.host}:${app.port}`)
    logger.debug('---------------------------------')
   })
