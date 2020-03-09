<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'App',
  methods: {
    checkLogin() {
      Axios.get('/api/users/checkLogin').then(response => {
        let res = response.data
        if(res.status === '0') {
          console.log('已登录')
        } else {
          console.log('未登录，自动跳转到商品列表')
          if(this.$route.path !== '/') {
            this.$router.push('/')
          }
        }
      })
    }
  },
  mounted() {
    this.checkLogin()
  }
}
</script>

<style lang="less">
</style>
