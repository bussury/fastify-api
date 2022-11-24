import { BaseModel, Rule } from "./../../core/index.js";

const schema = {
    ...BaseModel.genericSchema,

    id: new Rule({
        validatr: v => isUUID(v),
        description: 'UUID;',
        example: '16eefa82-491f-497a-8e9b-abfaf2872bf8'
    }),
    first_name: new Rule({
        validator: v => (typeof v === 'string') && v.length >= 3 && v.length <= 50,
        description: 'string; min 3; max 50 chars;'
    }),
    middle_name: new Rule({
        validator: v => (typeof v === 'string') && v.length >= 3 && v.length <= 50,
        description: 'string; min 3; max 50 chars;'
    }),
    surname: new Rule({
        validator: v => (typeof v === 'string') && v.length >= 3 && v.length <= 50,
        description: 'string; min 3; max 50 chars;'
    }),
    username: new Rule({
        validator: v => (typeof v === 'string') && v.length >= 3 && v.length <= 25,
        description: 'string; min 3; max 25 chars;'
    }),

    email: new Rule({
        validator: v => (typeof v === 'string') && isEmail(v) && v.length <= 50,
        description: 'string; email; max 50 chars;'
    }),
    newEmail: new Rule({
        validator: v => (typeof v === 'string') && isEmail(v) && v.length <= 50,
        description: 'string; email; max 50 chars;'
    })
}

export default class UserModel extends BaseModel {
    static get schema(){
        return schema;
    }
}