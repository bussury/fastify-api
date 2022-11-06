import { BaseAction } from "../../../http/Controllers/BaseAction.js";

class ListUsersAction extends BaseAction {
    static get accessTag () {
        return 'users:list'
    }
   

    static async run (req, res){
        const { query } = req

        return this.result({
            data: {'name': 'bussury'},
            headers: {
                'X-Total-Count': data.total
            }
        })
    }
}

export default new ListUsersAction()