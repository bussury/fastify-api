const {Model} = require("objection");
const BaseQuery = require("./BaseQuery.js")

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

module.exports = BaseModel