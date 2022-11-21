import { BaseDao } from './baseModel/BaseDao.js'
import { UserDto } from './UserDto.js'

export  class UserDao extends BaseDao{

    static get tableName () {
        return 'users'
    }
    
    static get dto () {
        return UserDto
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