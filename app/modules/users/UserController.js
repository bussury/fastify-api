import  BaseController  from './../../http/Controllers/BaseController.js'

import actions from './actions/index.js'

export default class UserController extends BaseController{
    
     async routes (app) {
        console.log(app)
        //  app.get('/api/user',{}, this.actionRunner(actions.ListUsersAction ))
         app.get('/api/user', (req, res) =>{
            res.send({ hello: 'world' })
        })
    }

    async init () {
        this.logger.debug(`${this.constructor.name} initialized...`)
    }
    
}
