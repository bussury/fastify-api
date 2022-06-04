import { Assert as assert } from './Assert.js'

class RequestRule {
    constructor( schemaRule, {required = false, allowed = []} ={} ){
        assert.instanceOf(schemaRule, Rule)
        assert.object(arguments[1])
        assert.boolean(required)
        assert.array(allowed)

        this.schemaRule = schemaRule
        this.options = { required, allowed }
    }
}

export { RequestRule }