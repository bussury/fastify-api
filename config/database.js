import knex from "knex";
import {Model} from "objection";
import knexfile from '../database/knexfile.js'
import 'dotenv/config'


const connectDB = async () => {
    /**
     * environment setting
     */
    const environment = process.env.APP_ENV;
    const configEnvironment = knexfile[environment];
 
    /**
     * set configuration to knex
     *
     */
    const connection = knex(configEnvironment);

    /**
     * initiate module
     */
    Model.knex(connection);

    // return connection
}

/**
 * export connection
 */
export default connectDB;