import { BaseAction } from "../../../http/Controllers/BaseAction.js";
import {UserDao} from '../../../models/UserDao.js'

export default class CreateUserAction extends BaseAction {
    static get accessTag () {
        return 'users:create'
    }
    static async run (ctx){
        const user = await UserDao.create({
            ...ctx.body
        })
        /**
         * make email confirmation
         */
        return this.result({ data: user })
    }
}
