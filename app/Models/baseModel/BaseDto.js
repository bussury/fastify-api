import { assert } from "../../../core/index.js"

export default class BaseDto {
    constructor (src = {}) {
        assert.object(src, { required: true })
    
        this.id = src.id
        this.userId = src.userId
        this.createdAt = src.created_at
        this.updatedAt = src.updated_at
      }
}