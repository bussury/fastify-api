import { BaseAction } from "../../../http/Controllers/BaseAction.js";
import { UserDao } from './../../../models/UserDao.js'

export default class GetUserByIdAction extends BaseAction {
    static get accessTag () {
        return 'users:get-by-id'
    }

    static get validationRules () {
        return {
          params: {
            id: new RequestRule(UserModel.schema.id, { required: true })
          }
        }
      }
      static async run (ctx) {
        const model = await UserDao.getdById(ctx.params.id)
        return this.result({ data: model })
      }
}
