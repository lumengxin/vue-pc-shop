import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
// 滚动请求加载
import infiniteScroll from 'vue-infinite-scroll'
// 全局注册公共组件
import './components/register.js'

Vue.use(VueLazyLoad, {
  loading: require("../public/img/loading-svg/loading-bars.svg")
  // loading: "./assets/logo.png"
})

Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // el: '#app',
  // template: '<APP/>',
  // componets: { App },
  render: h => h(App)
}).$mount('#app')
