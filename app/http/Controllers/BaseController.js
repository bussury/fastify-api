import { ErrorCodes, RequestRule, AppError,assert, AbstractLogger } from '../../../core/index.js'
class BaseController {
    constructor({logger} = {}){

        if (!this.init) throw new Error(`${this.constructor.name} should implement 'init' method.`)
        if (!this.router) throw new Error(`${this.constructor.name} should implement 'router' getter.`)
       
        assert.instanceOf(logger, AbstractLogger)
        this.logger = logger       
    }
}