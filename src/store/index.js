import Vue from 'vue'
import Vuex from 'vuex'

import dashboard from './modules/dashboard'
import slidesEditor from './modules/slides-editor'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    pageLoading: true
  },
  getters: {
    pageLoading: state => state.pageLoading
  },
  actions: {
    setPageLoading ({commit}, pageLoading) {
      commit('setPageLoading', pageLoading)
    }
  },
  mutations: {
    setPageLoading (state, pageLoading) {
      state.pageLoading = pageLoading
    }
  },
  modules: {dashboard, slidesEditor}
})
