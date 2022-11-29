import { BaseDao } from './baseModel/BaseDao.js'

export  class UserDao extends BaseDao{

    static get tableName () {
        return 'users'
    }
    static get jsonSchema() {
      return {
          type: 'object',
          required: ['username', 'first_name','midle_name','last_name','email','phone',],

          properties: {
              id: { type: 'integer' },
              username: { type: 'string', minLength: 1, maxLength: 255 },
              fisrt_name: { type: 'string', minLength: 1, maxLength: 255 },
              midle_name: { type: 'string', minLength: 1, maxLength: 255 },
              last_name: { type: 'string', minLength: 1, maxLength: 255 },
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
    

  /**
   * ------------------------------
   * @HOOKS
   * ------------------------------
   */
  $formatJson (json) {
    json = super.$formatJson(json)
    return json
  }
}