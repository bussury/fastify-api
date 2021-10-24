import { createApp}  from './main'
import { createRenderFunction } from 'fastify-vite-vue/server'

import routes from '../routes/web/web'

export default{
    routes,
    render: createRenderFunction(createApp)
}