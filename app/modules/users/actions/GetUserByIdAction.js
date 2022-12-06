import { BaseAction } from "../../../http/Controllers/BaseAction.js";
import { UserDao } from './../../../models/UserDao.js'

export default class GetUserByIdAction extends BaseAction {
    static get accessTag () {
        return 'users:get-by-id'
    }

      static async run (ctx) {
        const user = await UserDao.getById(Number(ctx.params.id))
        return this.result({ data: user })
      }
}
