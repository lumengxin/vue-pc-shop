import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require("../public/img/loading-svg/loading-bars.svg")
  // loading: "./assets/logo.png"
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // el: '#app',
  // template: '<APP/>',
  // componets: { App },
  render: h => h(App)
}).$mount('#app')
