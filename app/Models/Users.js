import BaseModel from './BaseModel.js'

class Users extends BaseModel {

    constructor(){
        super()
    }
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return ['id'];
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'first_name','middle_name','last_name','email','phone'],

            properties: {
                id: { type: 'integer' },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                fisrt_name: { type: 'string', minLength: 1, maxLength: 255 },
                middle_name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                profile_url: { type: 'string', minLength: 1, maxLength: 255 },
                phone: { type: 'string', minLength: 1, maxLength: 255 },

                // Properties defined as objects or arrays are
                // automatically converted to JSON strings when
                // writing to database and back to objects and arrays
                // when reading from database. To override this
                // behaviour, you can override the
                // Model.jsonAttributes property.
                // address: {
                //     type: 'object',
                //     properties: {
                //         street: { type: 'string' },
                //         city: { type: 'string' },
                //         zipCode: { type: 'string' }
                //     }
                // }
            }
        };
    }

}

export default  Users;