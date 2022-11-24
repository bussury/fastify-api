import { Model } from "objection"
import BaseQuery from "./BaseQuery.js";
import { assert, errorCodes, AppError } from "../../../core/index.js"

export  class BaseDao extends Model {


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
  static get dto () {
    return new AppError({
      ...errorCodes.SERVER,
      layer: 'DAO',
      message: `${this.name}: missing dto getter`
    })
  }

  static get QueryBuilder(){
    return BaseQuery
}

  /**
   * @param data
   * @returns {{total, results: *[]}}
   */
   static mapPage (data = {}) {

    assert.array(data.results, { required: true })
    assert.integer(data.total, { required: true })

    const Dto = this.dto
    assert.func(Dto, { required: true })
    return {
      results: data.map(i => new Dto(i)),
      // results: data.results,
      // total: data.total || 0
    }
  }

  /**
   * @param data
   * @returns {*}
   */
   static mapObject (data = {}) {
    assert.object(data, { required: true })
    const Dto = this.dto
    assert.func(Dto, { required: true })

    return new Dto(data)
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
   * @METHODS
   * ------------------------------
   */

  static async create (data = {}) {
    assert.object(data, { required: true })
    this.verifyUserId(data)

    const result = await this.query().insert(data)

    return this.mapObject(result)
  }

  static async update (id, data = {}) {
    assert.id(id, { required: true })
    assert.object(data, { required: true })

    const result = await this.query().patchAndFetchById(id, data)

    return this.mapObject(result)
  }


  static async all ({ page, limit, filter, orderBy } = {}) {
    // assert.integer(page, { required: false })
    // assert.integer(limit, { required: true })
    // assert.object(filter, { required: true })
    // assert.id(filter.userId)

    console.log('all')
    const data = await this.query()
      // .where({ ...filter })
      // .orderBy(orderBy.field, orderBy.direction)
      // .limit(limit)
      // .offset(page)
      .paginate(page,limit)
      // .page(page, limit)
      
      console.log('page')
    if (!data.length) return this.emptyPageResponse()
    // return this.mapPage(data)
    return data
  }

  static async count (filter = {}) {
    assert.object(filter, { required: true })

    const result = await this.query()
      .where({ ...filter })
      .count('*')
      .first()
    if (!result.count) return 0
    return Number(result.count)
  }

  static async getdById (id) {
    assert.id(id, { required: true })

    const data = await this.query().findById(id)
    if (!data) throw this.errorEmptyResponse()

    return this.mapObject(data)
  }

  static remove (id) {
    assert.id(id, { required: true })

    return this.query().deleteById(id)
  }

  static removeWhere (where = {}) {
    assert.object(where, { required: true })

    return this.query().delete().where({ ...where })
  }
}