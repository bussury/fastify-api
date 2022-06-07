import { Assert as assert } from "./Assert.js";
import { AbstractLogger } from "./AbstractLogger.js";
class BaseMiddleware {
    constructor({ logger } = {}){
        assert.instanceOf(logger, AbstractLogger)

        this.logger = logger
    }

    async init () {
        throw new Error(`${this.constructor.name} should implement 'init' method.`)
    }
    handler(){
        throw new Error(`${this.constructor.name} should implement 'handler' method.`)
    }
}

export { BaseMiddleware }