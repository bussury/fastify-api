import  BaseController  from './../../http/Controllers/BaseController.js'

import actions from './actions/index.js'

export default class UserController extends BaseController{
    constructor (logger){
        super(logger)
    }
    //  async routes (app) {
    //      app.get('/api/user',{}, this.actionRunner(actions.ListUsersAction ))
    //      app.get('/api/user1', (req, res) =>{
    //         res.send({ hello: 'world' })
    //     })
    // }

     set xRoutes(app){
        app.get('/api/user1', (req, res) =>{
            res.send({ hello: 'world' })
        })
    }
    async init () {
        this.logger.debug(`${this.constructor.name} initialized...`)
    }
    
}
