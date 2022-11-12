import { BaseDao } from './../../models/BaseDao'

export default class UserDao extends BaseDao{

    static get tableName () {
        return 'users'
    }
    
    static get dto () {
        return UserDbDto
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