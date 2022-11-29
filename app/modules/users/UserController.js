import  BaseController  from './../../http/Controllers/BaseController.js'
import { getAllSchema, getOneSchema, createSchema,} from './userSchema.js'

import actions from './actions/index.js'

export default class UserController extends BaseController {
    
     async routes (app) {
         app.get('/api/users',{schema: getAllSchema}, this.actionRunner(actions.ListUsersAction ))
         app.get('/api/users/:id',{schema: getOneSchema}, this.actionRunner(actions.GetUserByIdAction ))
    }

    async init () {
        this.logger.debug(`${this.constructor.name} initialized...`)
    }
    
}
