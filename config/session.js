'use strict'
const cookies = require('fastify-cookie')
const session = require('fastify-session')
const KnexSession = require('connect-session-knex')
const Knex = require("knex");
const fp = require('fastify-plugin');

const knexfile = require('../database/knexfile')

/**
 * environment setting
 */
const configEnvironment = knexfile[process.env.APP_ENV];

const knex = Knex(configEnvironment);

  const sessionStore =  KnexSession(session)
  const store =  new sessionStore({
    knex,
    tablename:'user_sessions'
})
/**
 * @param {import('fastify').FastifyInstance} fastify 
 */
const appSession = async (fastify) => {
    
    
    fastify.register(cookies);
    fastify.register(session,{
        cookieName: 'sessionId',
        store,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        cookie:{
            httpOnly:true,
            secure:process.env.NODE_ENV !=='development',
        },
        expires: 1800000
    });
};
module.exports = fp(appSession)