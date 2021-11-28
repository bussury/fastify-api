<template>
    <router-view v-slot ="{Component}" >
      <Suspense @resolve="hydrationDone"> 
        <component :key="route.path" :is="Component"></component>
      </Suspense>
    </router-view>
</template>

<script>

import { hydrationDone } from 'fastify-vite-vue/client.mjs'
import { useHead } from '@vueuse/head'
import head from '@app/head.js'
import { useRoute } from 'vue-router'

export default {
  setup () {
    if (head) {
  		useHead(head)
  	}
    useHead({
      htmlAttrs:{
        lang:'en'
      },
      title: 'Vite App',
      meta: [{
        charset: 'utf-8',
        content: 'text/html'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
      {
        name: 'description',
        content: 'school management system',
      }]
    })
    return { 
      hydrationDone, 
      route: useRoute() }
  }
}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

