import Vue from 'vue'
import Vuex from 'vuex'

import dashboard from './modules/dashboard'
import editor from './modules/slides-editor'
import presenter from './modules/presenter'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    pageLoading: false
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
  modules: {
    dashboard: dashboard,
    editor: editor,
    presenter: presenter,
    user: user
  }
})
