import fastify from 'fastify'
import { Assert as assert } from './Assert.js'
import Bootstrap from './../../bootstrap/app.js'

class Server{
    constructor(
        { port, host, controllers, middlewares, errorMiddleware, cookieSecret, reqLimit = '5mb', logger }
    ){
        assert.integer(port, { required: true, min: 1000 })
        assert.string(host, { required: true, notEmpty: true })
        assert.array(controllers, { required: true, notEmpty: true, message: 'controllers param expects not empty array' })
        assert.array(middlewares, { required: true, notEmpty: true, message: 'middlewares param expects not empty array' })
        assert.instanceOf(errorMiddleware.prototype, BaseMiddleware)
        assert.string(cookieSecret)
        assert.string(reqLimit)
        assert.instanceOf(logger, AbstractLogger)

        logger.info('Server start initialization...')

        return start({ port, host, controllers, middlewares, ErrorMiddleware: errorMiddleware, cookieSecret, reqLimit, logger })
    }
}

function start({ port, host, controllers, middlewares, ErrorMiddleware, cookieSecret, reqLimit, logger }){
    return new Promise (async ( resolve, reject ) => {
        const app = fastify({
            logger: true,
            ignoreTrailingSlash: true
          })

        app.register(Bootstrap)
        return app.listen({port, host}, () => resolve({ port, host }))
    })
}

export default { Server }