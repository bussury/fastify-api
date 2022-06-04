import { BaseConfig } from "../core";

class AppConfig extends BaseConfig {
    constructor() { 
        super();
        this.appEnv = this.set('APP_ENV', env => ['development', 'production', 'test'].includes(env), 'development')
        this.port   =   this.set('APP_PORT', this.joi.number().port().required, 3000)
        this.host   =   this.set('APP_HOST', this.joi.string().hostname().required, 'localhost')
        this.name   =   this.set('APP_NAME', this.joi.string().required, 'fastify-api')
    }

}