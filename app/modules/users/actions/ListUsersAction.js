import { BaseAction } from "../../../http/Controllers/BaseAction.js";

export default class ListUsersAction extends BaseAction {
    static get accessTag () {
        return 'users:list'
    }
   

    static async run (req, res){
        const { query } = req
        console.log('ACTION PASS', query)
        res.send({
            data: {'name': 'bussury'},
            headers: {
                'X-Total-Count': data.total
            }
        })
        //  this.result({
        //     data: {'name': 'bussury'},
        //     headers: {
        //         'X-Total-Count': data.total
        //     }
        // })
    }
}
