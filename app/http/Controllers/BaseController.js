import { assert, AbstractLogger } from '../../../core/index.js'
export default class BaseController {
    constructor({ logger } = {}){

        if (!this.init) throw new Error(`${this.constructor.name} should implement 'init' method.`)
        if (!this.router) throw new Error(`${this.constructor.name} should implement 'router' getter.`)
       
        assert.instanceOf(logger, AbstractLogger)
        this.logger = logger          
    }
    actionRunner(action) {
      assert.func(action, { required: true })

      if (!action.hasOwnProperty('accessTag')) {
        throw new Error(`'accessTag' getter not declared in invoked '${action.name}' action`)
      }
  
      if (!action.hasOwnProperty('run')) {
        throw new Error(`'run' method not declared in invoked '${action.name}' action`)
      }
  
      return async (req, res) => {
        assert.object(req, { required: true })
        assert.object(res, { required: true })
        assert.func(next, { required: true })
  
        const ctx = {
          currentUser: req.currentUser,
          body: req.body,
          query: req.query,
          params: req.params,
          ip: req.ip,
          method: req.method,
          url: req.url,
          cookies: { ...req.cookies, ...req.signedCookies },
          headers: {
            'Content-Type': req.get('Content-Type'),
            Referer: req.get('referer'),
            'User-Agent': req.get('User-Agent')
          }
        }
  
        try {
  
          /**
           * check access to action by access tag
           */
          // await actionTagPolicy(action.accessTag, ctx.currentUser)
  
  
          /**
           * fire action
           */
          const response = await action.run(ctx)
  
          /**
           * set headers
           */
          if (response.headers) res.set(response.headers)
  
          /**
           * set cookie
           */
          if (response.cookies && response.cookies.length) {
            for (const cookie of response.cookies) {
              res.cookie(cookie.name, cookie.value, cookie.options)
            }
          }
  
          /**
           * optional redirect
           */
          if (response.redirect) return res.redirect(response.redirect.status, response.redirect.url)
  
          /**
           * set status and return result to client
           */
          return res.status(response.status).json({
            success: response.success,
            message: response.message,
            data: response.data
          })
        } catch (error) {
          error.req = ctx
        }
      }
    }
}
