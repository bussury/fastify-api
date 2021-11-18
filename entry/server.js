import { createApp}  from '../resources/client.js'
import { createRenderFunction } from 'fastify-vite-vue/server'

import routes from '../routes/web/web.js'

export default{
    routes,
    render: createRenderFunction(createApp),
}