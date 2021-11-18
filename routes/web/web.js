import { getRoutes } from 'fastify-vite/app'
import { hydrateRoutes } from 'fastify-vite-vue/client.mjs'

export const routes = [
    {
        path: '/',
        name: 'home.index',
        component: () => import("/resources/Pages/index.vue"),
    },
    {
        path: '/hello',
        name: 'home.hello',
        component: () => import("/resources/Pages/hello.vue"),
    }
]

export default import.meta.env.SSR
    ? () => getRoutes(import.meta.globEager('/resources/Pages/*.vue'))
    : () => getRoutes(hydrateRoutes(import.meta.glob('/resources/Pages/*.vue')))


// export default () => getRoutes(routes)