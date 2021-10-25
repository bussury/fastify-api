import { createSSRApp } from 'vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'

import base from '../resources/App.vue' 
import routes from '../routes/web/web.js'

export function createApp (ctx) {
    const app = createSSRApp(base)
    const head = createHead()
    const history = import.meta.env.SSR
      ? createMemoryHistory()
      : createWebHistory()
    const router = createRouter({ history, routes })
    app.use(router)
    app.use(head)
    return { ctx, app, head, router }
  }