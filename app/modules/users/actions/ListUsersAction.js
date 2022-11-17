import { BaseAction } from "../../../http/Controllers/BaseAction.js";

export default class ListUsersAction extends BaseAction {
    static get accessTag () {
        return 'users:list'
    }
   

    static async run (ctx){
        const { query } = ctx
        return this.result({
            data: {'name': 'bussury'},
            headers: {
                // 'X-Total-Count': data.total it have to come from db
                'X-Total-Count': 25
            }
        })
    }
}
