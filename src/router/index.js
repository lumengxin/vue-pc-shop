import Vue from 'vue'
import VueRouter from 'vue-router'
import GoodsList from '../views/goods/GoodsList'
import MyCart from '../views/cart/Cart'
import Address from '../views/pay/Address'
import OrderConfirm from '../views/pay/OrderConfirm'
import OrderSuccess from '../views/pay/OrderSuccess'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: GoodsList
  },
  {
    path: '/cart',
    component: MyCart
  },
  {
    path: '/address',
    component: Address
  },
  {
    path: '/orderConfirm',
    component: OrderConfirm
  },
  {
    path: '/orderSuccess',
    component: OrderSuccess
  }
]

const router = new VueRouter({
  // 路由模式：history, hash
  mode: 'hash',

  routes
})

export default router
