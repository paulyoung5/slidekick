import Vue from 'vue'
import * as api from '../../api/presentation'

const blankPresentation = {
  title: 'New Presentation',
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
  async createPresentation ({ commit }) {
    try {
      const res = await api.savePresentation(blankPresentation)
      commit('fetchPresentation', res.data.presentation)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchPresentations ({ commit }) {
    try {
      // At this point, get the presentation data from mongodb! we can then update the state
      const res = await api.getPresentations()
      commit('fetchPresentations', res.data.presentations)
      commit('setPageLoading', false, { root: true })
    } catch (error) {
      console.error(error)
    }
  },
  async createNewPresentation ({ commit }) {
    try {
      const title = window.prompt('Please enter a name for your presentation')
      if (!title) {
        window.alert('Please enter a name.')
        return
      }
      const presentation = blankPresentation
      presentation.title = title

      return api.savePresentation(presentation).then(res => {
        commit('fetchPresentation', res.data.presentation)
      })
    } catch (error) {
      console.error(error)
    }
  },
  deletePresentation ({commit}, presentationId) {
    const confirm = window.confirm('Are you sure you want to delete this presentation?')
    if (confirm) {
      api.deletePresentation(presentationId)
        .then(() => commit('deletePresentation', presentationId))
        .catch(() => window.alert('Failed to delete presentation, please try again'))
    }
  },
  renamePresentation ({commit}, presentation) {
    const newTitle = window.prompt('Please enter the new title')
    if (!newTitle) {
      window.alert(`The entered title wasn't valid. Please try again.`)
    }
    api.savePresentation(presentation)
      .then(res => commit('fetchPresentation', res.data.presentation))
      .catch(res => window.alert(res.err.message))
  }
}

const mutations = {
  fetchPresentations (state, presentations) {
    for (let i = 0; i < presentations.length; i += 1) {
      Vue.set(state.presentations, presentations[i].id, presentations[i])
    }
  },
  fetchPresentation (state, presentation) {
    Vue.set(state.presentations, presentation.id, presentation)
  },
  deletePresentation (state, presentationId) {
    Vue.delete(state.presentations, presentationId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
