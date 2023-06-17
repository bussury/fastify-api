import app from './app.js'
import knex from './knex.js'
import session from './session.js'

const asyncConfig = [
    app,
    knex

]
function start() {
    return new Promise( async (resolve, reject) => {
        for (const config of asyncConfig) {
           try {
            await config.init()
           } catch (error) {
               reject(error)
           }
        }
        resolve()
    })
}

export {
    app,
    start,
    knex,
    session,
}