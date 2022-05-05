import {AssertionError}  from './AssertionError.js'

import util from 'util'

const UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const URL_REGEXP = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
const validTypes = [Number, String, Object, Array, Boolean, Function]

const isBonject =  (v) => v && typeof v === 'object' && !Array.isArray(v)

class Assert {

    static fail (actual, expected, message) {
        throw new AssertionError(message || `Failed value: ${util.inspect(actual)}; ${expected !== undefined ? `Expect: ${util.inspect(expected.name || expected)}` : ''}`)
    }
}
export default {Assert}