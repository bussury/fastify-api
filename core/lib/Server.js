import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import fastifySensible from "@fastify/sensible";
import formBodyPlugin from '@fastify/formbody'

import { Assert as assert } from './Assert.js'
import {AbstractLogger} from './AbstractLogger.js'
import Bootstrap from '../../bootstrap/app.js'

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
 * @param {String} params.cookieSecret
 * @param {String} params.reqLimit
 * @param {AbstractLogger} params.logger
 */
function start({ port, host, controllers, middlewares, ErrorMiddleware, cookieSecret, reqLimit, logger }){
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
         *  5. your services
         **/ 

        /**
         * register all plugins before usage
         */
        await app.register(fastifyMultipart)
        await app.register(formBodyPlugin)
        await app.register(fastifySensible)

        /**
        * error setting
        */
        // app.setErrorHandler(ErrorHandler)


        // 4. middlewares initialization

        // 5. Services

        /**
         * register bootstrap
         * @type {Bootstrap}
         */


        app.register(Bootstrap)
        return app.listen({port, host}, () => resolve({ port, host }))
    })
}

export { Server }