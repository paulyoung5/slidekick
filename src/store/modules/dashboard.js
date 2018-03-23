import Vue from 'vue'
import api from '../../api/presentation'

const blankPresentation = {
  title: 'New Presentation'
  slides: [
    {
      backgroundColour: '#FFFFFF',
      elements: [
          {
            id: 0,
            type: 'TEXT',
            properties: {
              x: '30px',
              y: '30px',
              fill: '#000000',
              fontFamily: 'Verdana',
              fontSize: '20px',
              content: 'Title goes here'
            }
          }
        ]
    }
  ]
}

const state = {
  presentations: {}
}

const getters = {
  presentations: state => state.presentations
}

const actions = {
  async createPresentation () {
    try {
      const res = await api.savePresentation(blankPresentation)
      commit('setPresentation', res.data.presentation)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchPresentations ({commit}, userId) {
    try {
      // At this point, get the presentation data from mongodb! we can then update the state
      const res = await api.getPresentationsForUser(userId)
      commit('setPresentations', res.data.presentations)
      commit('setPageLoading', false, { root: true })
    } catch (error) {
      console.error(error)
    }
  }
}

const mutations = {
  setPresentations (state, presentations) {
    for (let i = 0; i < presentations.length; i += 1) {
      Vue.set(state.presentations, presentations[i].id, presentations[i])
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
