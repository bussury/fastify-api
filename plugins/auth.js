  
'use strict'
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt'
/**
 * @param {import('fastify').FastifyInstance} fastify 
 */
async function appAuthentication(fastify,opts)  {

    const revokedTokens =  new Map()

    fastify.register(fastifyJwt, {

    })
    
    fastify.decorateRequest()
    fastify.decorateRequest()
   
}

export default fp(appAuthentication)