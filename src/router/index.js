import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '../views/goods/GoodsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: GoodsList
  }
]

const router = new VueRouter({
  // 路由模式：history, hash
  mode: 'hash',

  routes
})

export default router
