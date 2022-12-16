import  BaseController  from './../../http/Controllers/BaseController.js'
import { getAllSchema, getOneSchema, createSchema, updateSchema, deleteSchema} from './userSchema.js'

import actions from './actions/index.js'

export default class UserController extends BaseController {
    
     async routes (app) {
         app.get('/api/users',{schema: getAllSchema}, this.actionRunner(actions.ListUsersAction ))
         app.get('/api/users/:id',{schema: getOneSchema}, this.actionRunner(actions.GetUserByIdAction ))
         app.post('/api/users',{schema: createSchema}, this.actionRunner(actions.CreateUserAction ))
         app.patch('/api/users/:id',{schema: updateSchema}, this.actionRunner(actions.UpdateUserAction))
         app.delete('/api/users/:id',{schema: deleteSchema}, this.actionRunner(actions.RemoveUserAction ))
    }

    async init () {
        this.logger.debug(`${this.constructor.name} initialized...`)
    }
    
}
