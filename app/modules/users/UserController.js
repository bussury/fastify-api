import  BaseController  from './../../http/Controllers/BaseController.js'

import actions from './actions/index.js'

export default class UserController extends BaseController {
    
     async routes (app) {
         app.get('/api/users',{}, this.actionRunner(actions.ListUsersAction ))
         app.get('/api/users/:id',{}, this.actionRunner(actions.GetUserByIdAction ))
    }

    async init () {
        this.logger.debug(`${this.constructor.name} initialized...`)
    }
    
}
