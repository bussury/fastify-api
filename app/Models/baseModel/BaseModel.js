import { Model } from "objection";
import BaseQuery from "./BaseQuery.js";
import { assert, errorCodes, AppError } from "../../../core/index.js"

class BaseModel extends Model{
    
    constructor(){
        super()
    }

    static get QueryBuilder(){
        return BaseQuery
    }
    static verifyUserId (data) {
        assert.object(data, { required: true })
    
        /**
         * each entity that creates must have creator id (userId)
         */
        if (!data.email && !data.userId) {
          throw new AppError({
            ...errorCodes.UNPROCESSABLE_ENTITY,
            message: 'Please provide in action class \'userId\' field',
            layer: 'DAO'
          })
        }
    }
    
    static query () {
        return super.query.apply(this, arguments).onError(error => {
          return Promise.reject(wrapError(error))
            .catch(error => {
              error = error.nativeError || error
    
              if (error instanceof UniqueViolationError) {
                throw new AppError({
                  ...errorCodes.DB_DUPLICATE_CONFLICT,
                  message: `Column '${error.columns}' duplicate in '${error.table}' table`,
                  layer: 'DAO'
                })
              }
    
              if (error instanceof NotNullViolationError) {
                throw new AppError({
                  ...errorCodes.DB_NOTNULL_CONFLICT,
                  message: `Not null conflict failed for table '${error.table}' and column '${error.column}'`,
                  layer: 'DAO'
                })
              }
    
              throw new AppError({ ...errorCodes.DB, message: error.message, layer: 'DAO' })
            })
        })
    }
    
       /**
       * ------------------------------
       * @HOOKS
       * ------------------------------
       */
    
        $beforeUpdate () {
            this.updatedAt = new Date().toISOString()
          }



 /**
   * ------------------------------
   * @HELPERS
   * ------------------------------
   */

  static errorEmptyResponse () {
    return new AppError({ ...errorCodes.NOT_FOUND, layer: 'DAO' })
  }

  static emptyPageResponse () {
    return { results: [], total: 0 }
  }

  static emptyListResponse () {
    return []
  }

  static emptyObjectResponse () {
    return {}
  }
}

export default BaseModel