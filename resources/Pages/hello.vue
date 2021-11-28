<template>

  <router-link to='/'>home</router-link>
  <div>
    <div class="">
      hello {{user}} bussury
    </div>
    <h3> users from server </h3>
    <div>
      <!-- {{users}} -->
    </div>
  </div>
<!--  <h1 @click="refreshData">{{ state.users }}</h1>-->
</template>

<script>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useHead } from '@vueuse/head'

export const path = '/hello'

export default {
  async setup () {
    useHead({
      title: 'Vite hello',
    })
  
    // const api = useServerAPI()
    const user = reactive([])
    // const {json: users} =  await api.getAllUsers()
    return {
      // users,
      user,
    }
  }
}
</script>

<style scoped>
h1 {
  cursor: pointer;
  color: red;
}
</style>