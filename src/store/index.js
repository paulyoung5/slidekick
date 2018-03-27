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
    savingState: false,
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
    setTimeout (state, fn) {
      state.savingState = true
      state.changeDelayTimer = setTimeout(fn, 5000)
    },
    clearTimeout (state) {
      console.log('Cancelled save event')
      state.savingState = false
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
  if (!store.getters['savingState'] && store.getters['editor/dirty']) {
    console.info('Saving..')
    store.commit('clearTimeout')
    store.commit('setTimeout', () => store.dispatch('editor/savePresentation', {
      presentation: store.getters['editor/presentation']
    }).then(() => store.commit('editor/resetDirtyFlag')))
  }
})

export default store
