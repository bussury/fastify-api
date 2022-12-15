import { BaseAction } from "../../../http/Controllers/BaseAction.js";
import {UserDao} from '../../../models/UserDao.js'

export default class UpdateUserAction extends BaseAction {
    static get accessTag () {
        return 'users:update'
    }
    static async run (ctx){
        const { currentUser, body } = ctx
        const user = await UserDao.update(ctx.params.id,body)
        return this.result({ data: user })
    }
}
