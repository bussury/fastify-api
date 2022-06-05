import { BaseConfig } from "../core/index.js";
import logger from "../logger.js";

class AppConfig extends BaseConfig {
    constructor() { 
        super();
        this.appEnv = this.set('APP_ENV', env => ['development', 'production', 'test'].includes(env), 'development')
        this.port   =   this.set('APP_PORT', this.joi.number().port().required(), 3000)
        this.host   =   this.set('APP_HOST', this.joi.string().hostname().required(), 'localhost')
        this.name   =   this.set('APP_NAME', this.joi.string().required(), 'fastify-api')
        this.url    =   this.set('APP_URL', this.joi.string().required())
    }

    async init () {
        //  we ca initilize any async function before
        logger.debug(`${this.constructor.name}: Initialization finish...`)
    }
}

export default new AppConfig()