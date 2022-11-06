export default class BaseBto {
    constructor (src = {}) {
        assert.object(src, { required: true })
    
        this.id = src.id
        this.userId = src.userId
        this.createdAt = src.createdAt
        this.updatedAt = src.updatedAt
      }
}