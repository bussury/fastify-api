import BaseModel from "./BaseModel.js";
import { assert, errorCodes, AppError } from "../../../core/index.js"

export  class BaseDao extends BaseModel {


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