import 'dotenv/config'

const connection = {
    host : process.env.DB_HOST||'127.0.0.1',
    port : process.env.DB_PORT||'3306',
    user : process.env.DB_USER||'root',
    password : process.env.DB_PASSWORD||'bussury@22',
    database : process.env.DB_NAME||'fastify_api'
}

export { connection }