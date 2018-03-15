import Vue from 'vue'
import api from '../../api/presentation'

const state = {
  presentations: []
}

const getters = {
  presentations: state => state.presentations
}

const actions = {
  async fetchPresentations ({commit}, userId) {
    try {
      // At this point, get the presentation data from mongodb! we can then update the state
      const res = await api.getPresentationsForUser(userId)
      commit('setPresentations', res.data.presentations)
      commit('setPageLoading', false, { root: true })
    } catch (error) {
      console.error(error)
    }
  },
  createNewPresentation ({commit}, userId) {
    const title = window.prompt('Please enter a name for your presentation')
    if (!title) {
      window.alert('You did not enter a name')
      return
    }

    commit('createPresentation', {title, userId})
  }
}

const mutations = {
  setPresentations (state, presentations) {
    for (let i = 0; i < presentations.length; i += 1) {
      Vue.set(state.presentations, presentations[i].id, presentations[i])
    }
  },
  createPresentation (state, {userId, title}) {
    const newPresId = Math.max(0, ...state.presentations.map(p => p.id)) + 1
    state.presentations.push({
      id: newPresId,
      userId,
      title,
      slides: []
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
