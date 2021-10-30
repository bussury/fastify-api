import { loadRoutes } from 'fastify-vite-vue/app'

// export default loadRoutes(import.meta.globEager('../../resources/Pages/*.vue'))
export const routes = [
    {
        path: '/',
        name: 'home.index',
        component: () => import("/resources/Pages/index.vue"),
    },
    {
        path: '/:catchAll(.*)*',
        name: "PageNotFound",
        component: () => import('/resources/Components/NotFound.vue'),
      },
    {
        path: '/hello',
        name: 'home.hello',
        component: () => import("/resources/Pages/hello.vue"),
    }
]
export default loadRoutes(routes)