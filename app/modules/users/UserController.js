import BaseController from './../../http/Controllers/BaseController.js'

import actions from './actions/ListUsersAction.js'

export default class UserController extends BaseController {

    async router(app){
        app.get('/api/user',{}, (req,res) => {
            return {'app':'testing'}
        })
    }

    async init () {
        this.logger.debug(`${this.constructor.name} initialized...`)
      }
    
}

