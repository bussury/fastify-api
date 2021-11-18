import { Model } from "objection";
import BaseQuery from "./BaseQuery.js";


class BaseModel extends Model{
    
    constructor(){
        super()
    }

    static get QueryBuilder(){
        return BaseQuery
    }
    all(){}
    save(){}
    update(){}
    delete(){}
    // paginate(){
    //     return this.$query()
    // }
}

export default BaseModel