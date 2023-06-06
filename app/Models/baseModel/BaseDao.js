import BaseModel from "./BaseModel.js";
import { assert, errorCodes, AppError } from "../../../core/index.js"

export  class BaseDao extends BaseModel {


  static async create (data = {}) {
    assert.object(data, { required: true })
    // this.verifyUserId(data)
      
      const result =  await this.query().insert(data)
      return result
    
  }

  static async update (id, data = {}) {
    assert.id(id, { required: true })
    assert.object(data, { required: true })

    const result = await this.query().patchAndFetchById(id, data)

    return this.mapObject(result)
  }


  static async all ({ page, limit, filter, orderBy } = {}) {
    let current_page = page - 1
    assert.integer(Number(current_page), { required: true, message:"page number is required" })
    assert.integer(Number(limit), { required: true, message:"limit number of obejcts is required" })
    assert.object(filter, { required: false })
    // assert.id(filter.userId)

    const offset = (current_page) * limit;
    const data = await this.query()
      .where({ ...filter })
      // .orderBy(orderBy.field, orderBy.direction)
      .limit(limit)
      .offset(offset)

    // if (!data.results.length) return this.emptyPageResponse()
    if (!data.length) return this.emptyPageResponse()
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

  static async getById (id) {
    assert.id(id, { required: true })
    const data = await this.query().findById(id).throwIfNotFound({message:`item with ${id} not found`})
    if (!data) throw this.errorEmptyResponse()
    return data
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