import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updataUserInfo(state, nickName) {
      state.nickName = nickName
    },
    updataCartCount(state, cartCount) {
      state.cartCount += cartCount
    },
    initCartCount(state, cartCount) {
      state.cartCount = cartCount
    }
  },
  actions: {
  },
  modules: {
  }
})
