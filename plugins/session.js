"use strict";
import cookies from "@fastify/cookie";
import session from "@fastify/session";
import {ConnectSessionKnexStore} from "connect-session-knex";
import Knex from "knex";
import fp from "fastify-plugin";

import knexfile from "../database/knexfile.js";

/**
 * environment setting
 */
const configEnvironment = knexfile[process.env.APP_ENV];
const knex = Knex(configEnvironment);

// const sessionStore = KnexSession(session);
const sessionStore = new ConnectSessionKnexStore({
  knex,
  tablename: "user_sessions",
});

/**
 * @param {import('fastify').FastifyInstance} fastify
 */
async function appSession(fastify, opts) {
  console.log("Session Testing ");
  fastify.register(cookies);
  fastify.register(session, {
    cookieName: "sessionId",
    sessionStore,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    },
    expires: 1800000,
  });
}

export default fp(appSession);
