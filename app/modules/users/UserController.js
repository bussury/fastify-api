import  BaseController  from './../../http/Controllers/BaseController.js'

import actions from './actions/index.js'

export default class UserController extends BaseController {
    
     async routes (app) {
         app.get('/api/user',{}, this.actionRunner(actions.ListUsersAction ))
    }

    async init () {
        this.logger.debug(`${this.constructor.name} initialized...`)
    }
    
}
