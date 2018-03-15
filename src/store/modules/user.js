import Vue from 'vue'

import * as types from '../mutations'

export default {
  state: {
    current: null
  },
  getters: {
    current_user: state => state.current,
    is_logged_in: state => state.current !== null
  },
  mutations: {
    [types.AUTHENTICATE_USER] (state, user) {
      Vue.set(state, 'current', user)
    },
    [types.LOG_OUT] (state) {
      Vue.set(state, 'current', null)
    }
  }
}
