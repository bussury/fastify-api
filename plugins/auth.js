  
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
   
}

export default fp(appAuthentication)