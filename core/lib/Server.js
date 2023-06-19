import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import fastifySensible from "@fastify/sensible";
import formBodyPlugin from '@fastify/formbody'
import fastifyCookie from '@fastify/cookie';

import { Assert as assert } from './Assert.js'
import {AbstractLogger} from './AbstractLogger.js'


class Server{
    constructor(
        { port, host, controllers, middlewares, errorMiddleware, cookieSecret, reqLimit = '5mb', logger }
    ){
        assert.integer(port, { required: true, min: 1000 })
        assert.string(host, { required: true, notEmpty: true })
        // assert.array(controllers, { required: true, notEmpty: true, message: 'controllers param expects not empty array' })
        // assert.array(middlewares, { required: true, notEmpty: true, message: 'middlewares param expects not empty array' })
        // assert.instanceOf(errorMiddleware.prototype, BaseMiddleware)
        // assert.string(cookieSecret)
        assert.string(reqLimit)
        assert.instanceOf(logger, AbstractLogger)

        logger.info('Server start initialization...')
        return start({ port, host, controllers, middlewares, ErrorMiddleware: errorMiddleware, cookieSecret, reqLimit, logger })
    }
}

/**
 * start server
 * @param {Object} params
 * @param {Number} params.port
 * @param {String} params.host
 * @param {Array} params.controllers
 * @param {Array} params.middlewares
 * @param {BaseMiddleware} params.ErrorMiddleware
 * @param {String} params.reqLimit
 * @param {AbstractLogger} params.logger
 */
function start({ port, host, controllers, middlewares, ErrorMiddleware, reqLimit, logger }){
    return new Promise (async ( resolve, reject ) => {
        /**
         * create fastify app
         * @type {fastify.FastifyInstance}
         * @see https://fastify.io/docs/latest/
         */
        const app = fastify({
            logger: true,
            ignoreTrailingSlash: true
          })
        /**
         *  order to register / load app modules
         *  1. plugins (from the Fastify ecosystem)
         *  2. your plugins (your custom plugins)
         *  3. decorators
         *  4. hooks and middlewares
         *  5. your services and routes
         **/ 

        /**
         * 1 @Fastify plugins 
         * register all fastify plugins before usage
         */
        await app.register(fastifyMultipart)
        await app.register(formBodyPlugin)
        await app.register(fastifySensible)
        await app.register(fastifyCookie, {
          secret: "my-secret", // for cookies signature
          hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
          parseOptions: {}  // options for parsing cookies
        })

        /**
          * middlewares initialization
        */
          try {
            for (const middleware of middlewares.map(Middleware => new Middleware({ logger }))) {
              await middleware.init()
              app.register(middleware.handler())
            }
          } catch (e) {
            return reject(e)
          }
        /**
         * 2 @Custom plugins
         * Controllers / modules
         */
         try {
            for (const controller of controllers.map(Controller => new Controller({ logger }))) {
              await controller.init()
              await controller.routes(app)
            }
          } catch (e) {
            reject(e)
          }


        // 5. Services

        return app.listen({port, host}, () => resolve({ port, host }))
    })
}

export { Server }