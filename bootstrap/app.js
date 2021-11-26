import fastifyMultipart from 'fastify-multipart'
import fastifySensible from "fastify-sensible";
import formBodyPlugin from 'fastify-formbody'

import autoLoad from 'fastify-autoload'
import path from 'path'


import ErrorHandler from './../app/Exceptions/handler.js'

const base = process.cwd()
/**
  *  order to register / load
  *  1. plugins (from the Fastify ecosystem)
  *  2. your plugins (your custom plugins)
  *  3. decorators
  *  4. hooks and middlewares
  *  5. your services
  **/ 
 
export default async function (app) {  
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
        dir: path.join(base, 'config')
      })

    /**
     * error setting
     */
     app.setErrorHandler(ErrorHandler)
     

    /**
     * register all routes served by server
     * @API routes
     */
      await app.register(autoLoad, {
        dir: path.join(base, 'routes/api'),
        options: Object.assign({ prefix: '/api' })
        })
        // await app.register(autoLoad, {
        //   dir: join(__dirname, 'routes/web')
        // })

    // 4. middlewares

    // 5. Services

}