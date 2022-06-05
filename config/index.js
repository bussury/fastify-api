import app from './app.js'

const asyncConfig = [
    app,

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
}