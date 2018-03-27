import Vue from 'vue'
import Vuex from 'vuex'

import dashboard from './modules/dashboard'
import editor from './modules/slides-editor'
import presenter from './modules/presenter'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    pageLoading: false,
    savingState: null,
    changeDelayTimer: null
  },
  getters: {
    pageLoading: state => state.pageLoading,
    savingState: state => state.savingState,
    changeDelayTimer: state => state.changeDelayTimer
  },
  actions: {
    setPageLoading ({commit}, pageLoading) {
      commit('setPageLoading', pageLoading)
    }
  },
  mutations: {
    setPageLoading (state, pageLoading) {
      state.pageLoading = pageLoading
    },
    clearTimeout (state) {
      clearTimeout(state.changeDelayTimer)
    }
  },
  modules: {
    dashboard: dashboard,
    editor: editor,
    presenter: presenter,
    user: user
  }
})

store.watch(() => store.getters['editor/dirty'], value => {
  if (!store.getters['savingState']) {
    setTimeout(() => {
      console.info('Saving..')
      this.savingState = store.dispatch('editor/savePresentation', {
        presentation: store.getters['editor/presentation']
      }).then(() => store.commit('editor/resetDirtyFlag'))
    }, 5000)
  }
})

export default store
