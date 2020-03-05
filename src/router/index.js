import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '../views/goods/GoodsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/goods/:goodsId/user/:username',
    // 路由中name和组件中name无联系
    // name: 'somegoods',
    component: GoodsList
  }
]

const router = new VueRouter({
  // 路由模式：history, hash
  mode: 'hash',
  routes
})

export default router
