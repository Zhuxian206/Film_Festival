import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 這樣就註冊了一個vuex的user模組
    user
  },
  plugins: [createPersistedState({
    key: 'film',
    paths: ['user.token']
  })]
})
