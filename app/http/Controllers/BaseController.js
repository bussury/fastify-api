import { ErrorCodes, RequestRule, AppError,assert, AbstractLogger } from '../../../core/index.js'
class BaseController {
    constructor({logger} = {}){

        if (!this.init) throw new Error(`${this.constructor.name} should implement 'init' method.`)
        if (!this.router) throw new Error(`${this.constructor.name} should implement 'router' getter.`)
       
        assert.instanceOf(logger, AbstractLogger)
        this.logger = logger       
    }
    actionRunner() {

    }
    validateSchema(src, requestSchema, schemaTitle) {
        assert.object(src, { required: true, message: `Invalid request validation payload. Only object allowed. Actual type: ${Object.prototype.toString.call(src)}` })
        assert.object(requestSchema, { required: true })
        assert.string(schemaTitle, { required: true })

        const schemaKeys = Object.keys(requestSchema)
        const srcKeys = Object.keys(src)

        const defaultValidKeys = ['offset', 'page', 'limit', 'filter', 'orderBy']
        const invalidExtraKeys = srcKeys.filter(srcKey => !schemaKeys.includes(srcKey) && !defaultValidKeys.includes(srcKey))

        if (invalidExtraKeys.length) {
            throw new AppError({
              ...ErrorCodes.VALIDATION,
              message: `Extra keys found in '${schemaTitle}' payload: [${invalidExtraKeys}]`,
              layer: this.constructor.name
            })
        }

        if (!schemaKeys.length) return

        schemaKeys.forEach(propName => {
            const validationSrc = src[propName]
      
            const { schemaRule, options } = requestSchema[propName]
            const { validator, description, example } = schemaRule
            const hasAllowedDefaultData = options.allowed.includes(validationSrc)
      
            if (options.required && !src.hasOwnProperty(propName) && !hasAllowedDefaultData) {
              throw new AppError({
                ...ErrorCodes.VALIDATION,
                message: `'${schemaTitle}.${propName}' field is required.`,
                layer: this.constructor.name
              })
            }
      
            if (src.hasOwnProperty(propName)) {
              const tmpValidationResult = validator(validationSrc)
              if (!['boolean', 'string'].includes(typeof tmpValidationResult)) {
                throw new AppError({
                  ...ErrorCodes.DEV_IMPLEMENTATION,
                  message: `Invalid '${schemaTitle}.${propName}' validation result. Validator should return boolean or string. Fix it !`,
                  layer: this.constructor.name
                })
              }
      
              const validationResult = tmpValidationResult || hasAllowedDefaultData
              if (typeof validationResult === 'string') {
                throw new AppError({
                  ...ErrorCodes.VALIDATION,
                  message: `Invalid '${schemaTitle}.${propName}' field, ${validationResult}`,
                  meta: { example, expect: description },
                  layer: this.constructor.name
                })
              } if (validationResult === false) {
                throw new AppError({
                  ...ErrorCodes.VALIDATION,
                  message: `Invalid '${schemaTitle}.${propName}' field`,
                  meta: { example, expect: description },
                  layer: this.constructor.name
                })
              }
            }
        })
    }
}

function getSchemaDescription(validationRules = {}){

    function getRuleDescription(propName, schema){
        assert.string(propName, { required: true })
        assert.object(schema, { required: true })

        const requestRule = schema[propName]
        assert.instanceOf(requestRule, RequestRule)

        if (!requestRule) return
        const { schemaRule, options } = requestRule

        return `${schemaRule.description} ${options.required ? ';(required)' : ';(optional)'}`
    }

    const result = { query: {}, params: {}, body: {} }
    const { query, params, body } = validationRules

    if (query) Object.keys(query).forEach(schemaPropName => (result.query[schemaPropName] = getRuleDescription(schemaPropName, query)))
    if (params) Object.keys(params).forEach(schemaPropName => (result.params[schemaPropName] = getRuleDescription(schemaPropName, params)))
    if (body) Object.keys(body).forEach(schemaPropName => (result.body[schemaPropName] = getRuleDescription(schemaPropName, body)))

    return result
}