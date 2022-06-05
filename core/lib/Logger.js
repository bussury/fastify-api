import pino from "pino";

import { Assert as assert } from "./Assert.js";
import { ValidatorNano as validator} from './ValidatorNano.js'
import { AbstractLogger } from "./AbstractLogger.js";

const $ = Symbol('private scope')

class Logger extends AbstractLogger {
    constructor({appName, raw = false} = {}){
        super()

        assert.string(appName, { required: true })

        this[$] = {
      
            fatalLogger: pino({
              name: `${appName.toLowerCase()}::fatal`,
              errorLikeObjectKeys: ['err', 'error'],
              ...(!raw && { prettyPrint: { translateTime: 'SYS:standard' } })
            }),
            errorLogger: pino({
              name: `${appName.toLowerCase()}::error`,
              errorLikeObjectKeys: ['err', 'error'],
              ...(!raw && { prettyPrint: { translateTime: 'SYS:standard' } })
            }),
            warnLogger: pino({
              name: `${appName.toLowerCase()}::warn`,
              ...(!raw && { prettyPrint: { translateTime: 'SYS:standard' } })
            }),
            infoLogger: pino({
              name: `${appName.toLowerCase()}::info`,
              ...(!raw && { prettyPrint: { translateTime: 'SYS:standard' } })
            }),
            debugLogger: pino({
              level: 20,
              name: `${appName.toLowerCase()}::debug`,
              ...(!raw && { prettyPrint: { translateTime: 'SYS:standard' } })
            }),
            traceLogger: pino({
              level: 10,
              name: `${appName.toLowerCase()}::trace`,
              ...(!raw && { prettyPrint: { translateTime: 'SYS:standard' } })
            })
          }
    }

   /**
   * ------------------------------
   * @PRIVATE_HELPERS
   * ------------------------------
   */
    fatal (message, error, meta) {
        assert.string(message, { required: true })
        assert.ok(error, { required: true })
        assert.ok(meta)
    
        const payload = validator.isObject(meta) ? { ...error, ...meta } : { ...error, meta }

        this[$].fatalLogger.fatal(payload, message)
      }
    
      error (message, error, meta) {
        assert.string(message, { required: true })
        assert.ok(error, { required: true })
        assert.ok(meta)
    
        const payload = validator.isObject(meta) ? { ...error, ...meta } : { ...error, meta }
    
        this[$].errorLogger.error(payload, message)
      }
    
      warn (message, error, meta) {
        assert.string(message, { required: true })
        assert.ok(error, { required: true })
        assert.ok(meta)
    
        const payload = validator.isObject(meta) ? { ...error, ...meta } : { ...error, meta }
    
        this[$].warnLogger.warn(payload, message)
      }
    
      /**
       * ------------------------------
       * @INFO_METHODS
       * ------------------------------
       */
    
      info (message, meta) {
        assert.string(message, { required: true })
        assert.ok(meta)
    
        const payload = validator.isObject(meta) ? meta : { meta }
    
        this[$].infoLogger.info(payload, message)
      }
    
      debug (message, meta) {
        assert.string(message, { required: true })
        assert.ok(meta)
    
        const payload = validator.isObject(meta) ? meta : { meta }
    
        this[$].debugLogger.debug(payload, message)
      }
    
      trace (message, meta) {
        assert.string(message, { required: true })
        assert.ok(meta)
    
        const payload = validator.isObject(meta) ? meta : { meta }
    
        this[$].traceLogger.trace(payload, message)
      }

}

export {Logger}