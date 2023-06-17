import { BaseConfig } from "../core/index.js";
import logger from "../logger.js";

class KnexConfig extends BaseConfig{
    constructor(){
        super()
        this.client =   'mysql2',
        this.connection = {
            host: this.set('DB_HOST', this.joi.string().min(4).max(100).required(), 'localhost'),
            port: this.set('DB_PORT', this.joi.number().required(), '5432'),
            user: this.set('DB_USER', this.joi.string().min(4).max(100).required(), 'root'),
            password: this.set('DB_PASSWORD', this.joi.string().empty('').required()),
            database: this.set('DB_NAME', this.joi.string().min(4).max(100).required()),
            charset: this.set('DB_CHARSET', this.joi.string().valid('utf8').required(), 'utf8')
        }
        this.pool = {
            min: 1,
            max: 10
          }
    }

    async init() {
    logger.debug(`${this.constructor.name}: Initialization finish...`)
    }
}

export default new KnexConfig()