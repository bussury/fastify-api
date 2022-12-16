import bcrypt from 'bcryptj'
import { assert } from "../../../../core";

export function makeHashedPassword (password) {
    assert.string(password, {notEmpty : true})

    return new Promise( (resolve, reject ) => {
        bcrypt.gen(10, (error, salt) =>{
            if (error) return reject(error)
            bcrypt.hash(password, salt, (error, hash) => {
                if (error) return reject(error)
                return resolve(hash)
              })
        })
    })
}