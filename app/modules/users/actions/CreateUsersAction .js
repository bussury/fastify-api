import { BaseAction } from "../../../http/Controllers/BaseAction.js";
import {UserDao} from '../../../models/UserDao.js'

export default class CreateUsersAction extends BaseAction {
    static get accessTag () {
        return 'users:create'
    }
    static async run (ctx){
        const { query } = ctx
        const data = await UserDao.all({...query})
        return this.result({
            data: data,
            headers: { 'X-Total-Count': data.total }
        })
    }
}
