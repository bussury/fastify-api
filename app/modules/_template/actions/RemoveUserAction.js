import { BaseAction } from "../../../http/Controllers/BaseAction.js";
import {UserDao} from '../../../models/UserDao.js'

export default class RemoveUserAction extends BaseAction {
    static get accessTag () {
        return 'users:remove'
    }
    static async run (req){
        const { currentUser } = req
        const id = req.params.id

        /**
         * get use by the id and update his/her policy
         */
        
        // @ TODO
        const user = await UserDao.getById(id)
        // await updateUserPolicy(model, currentUser)
         await UserDao.remove(id)
         return this.result({ message: `user with an id ${id} was removed` })
    }
}
