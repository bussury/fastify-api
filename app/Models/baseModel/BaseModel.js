import objection, { val } from "objection";
import BaseQuery from "./BaseQuery.js";
import { assert, errorCodes, AppError } from "../../../core/index.js"

const { NotFoundError, NotNullViolationError, ValidationError, UniqueViolationError} = objection
class BaseModel extends objection.Model{
    
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
          return Promise.reject(error)
            .catch(error => {
              error =  error ||error.nativeError
              if (error instanceof NotFoundError) {
                throw new AppError({
                  ...errorCodes.NOT_FOUND,
                  message: error.message,
                  layer: 'DAO',
                })
              }

              if (error instanceof UniqueViolationError) {
                const constraint =  error.constraint
                // const table = constraint.split('.')[0]
                const column = constraint.split('.')[1].split('_')[1]
              
                throw new AppError({
                  ...errorCodes.DB_DUPLICATE_CONFLICT,
                  message: ` '${column}' duplicate / exists`,
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