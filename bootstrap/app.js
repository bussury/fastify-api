// import fastifyMultipart from 'fastify-multipart'
// import fastifySensible from "fastify-sensible";
// import formBodyPlugin from 'fastify-formbody'

const fastifyMultipart =  require('fastify-multipart')
const fastifySensible =  require('fastify-sensible')
const formBodyPlugin = require('fastify-formbody')

// import autoLoad from 'fastify-autoload'
const autoLoad = require('fastify-autoload')
const path = require('path')
// import { dirname, join} from 'path'

// import ErrorHandler from './../app/Exceptions/handler.js'
const ErrorHandler =  require('../app/Exceptions/handler.js')



// const __filename = process.cwd()+ '/will be removed by dirname's
// const __dirname = path.dirname(__filename)

const root_folder = process.cwd()
/**
  *  order to register / load
  *  1. plugins (from the Fastify ecosystem)
  *  2. your plugins (your custom plugins)
  *  3. decorators
  *  4. hooks and middlewares
  *  5. your services
  **/ 
 
module.exports = async function (app) {  
    /***
     * 01. PLUGINS FROM FASTIFY ECOSYSTEM
     */

    /**
     * register all plugins before usage
     */
     await app.register(fastifyMultipart)
     await app.register(formBodyPlugin)
     await app.register(fastifySensible)

    
    // 02. plugins
    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application

      await app.register(autoLoad, {
        dir: path.join(root_folder, 'config')
      })

    /**
     * error setting
     */
     app.setErrorHandler(ErrorHandler)
     

    /**
     * register all routes served by client eg. vuejs,react,svelt etc
     */
      await app.register(autoLoad, {
        dir: path.join(root_folder, 'routes/api'),
        options: Object.assign({ prefix: '/api' })
        })
        // await app.register(autoLoad, {
        //   dir: join(__dirname, 'routes/web')
        // })

    /**
     * register all routes served by fastify POV
     */


    // 4. middlewares

    // 5. Services

}