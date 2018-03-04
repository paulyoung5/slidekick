import api from '../../api/presentation'

const state = {
  selectedSlideIndex: 0,
  zoomLevel: 1,
  selectedElementIndex: -1,

  presentation: {
    id: -1,
    title: '',
    slides: []
  }
}

const ZOOM_STEP_LEVEL = 0.2
const DEFAULT_NEW_SLIDE = JSON.stringify({
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
        content: 'Slide title'
      }
    },
    {
      id: 1,
      type: 'TEXT',
      properties: {
        x: '30px',
        y: '80px',
        fill: '#000000',
        fontFamily: 'Verdana',
        fontSize: '12px',
        content: 'Slide body text'
      }
    }
  ]
})

const getters = {
  presentation: state => state.presentation,
  presentationId: state => state.presentation ? state.presentation.id : -1,
  title: state => state.presentation.title,
  currentSlide: state => {
    if (!state.presentation.slides.length || !state.presentation.slides[state.selectedSlideIndex]) {
      return null
    }

    return state.presentation.slides[state.selectedSlideIndex]
  },
  selectedSlideIndex: state => state.selectedSlideIndex,
  selectedElementIndex: state => state.selectedElementIndex,
  currentElement: state => {
    if (!state.presentation.slides.length || state.selectedSlideIndex < 0 || state.selectedElementIndex < 0) {
      return null
    }

    return state.presentation.slides[state.selectedSlideIndex].elements.find(el => el.id === state.selectedElementIndex)
  },
  slides: state => state.presentation.slides,
  zoomLevel: state => state.zoomLevel
}

const actions = {
  async fetchPresentation ({commit}, presentationId) {
    try {
      const presentation = await api.getPresentation(presentationId)

      commit('setPresentation', presentation)
      commit('setPageLoading', false, { root: true })
    } catch (error) {
      console.error(error)
    }
  },

  zoomIn ({commit}) {
    commit('zoomIn')
  },

  zoomOut ({commit}) {
    commit('zoomOut')
  },

  updateTitle ({commit}, value) {
    commit('setTitle', value)
  },

  selectSlideFromList ({commit}, selectedSlideIndex) {
    commit('setSelectedSlideIndex', selectedSlideIndex)
  },

  createSlide ({commit}) {
    commit('createSlide')
  },

  deleteSlide ({commit}, slideIndex) {
    const confirm = window.confirm('Are you sure you want to delete this slide?')
    if (confirm) {
      commit('deleteSlide', slideIndex)
    }
  },

  inspectElement ({commit}, selectedElementIndex) {
    commit('setSelectedElementIndex', selectedElementIndex)
  },

  updateBackgroundColour ({commit}, value) {
    commit('setBackgroundColour', value)
  },

  updateX ({commit}, {element, value}) {
    commit('setElementX', {element, value})
  },

  updateY ({commit}, {element, value}) {
    commit('setElementY', {element, value})
  },

  updateFontFamily ({commit}, {element, value}) {
    commit('setElementFontFamily', {element, value})
  },

  updateFontSize ({commit}, {element, value}) {
    commit('setElementFontSize', {element, value})
  },

  updateFill ({commit}, {element, value}) {
    commit('setElementFill', {element, value})
  },

  updateContent ({commit}, {element, value}) {
    commit('setElementContent', {element, value})
  }
}

const mutations = {
  setPresentation (state, presentation) {
    state.presentation = presentation
  },

  setTitle (state, title) {
    state.presentation.title = title
  },

  setSlides (state, slides) {
    state.presentation.slides = slides
  },

  setSelectedSlideIndex (state, selectedIndex) {
    state.selectedSlideIndex = selectedIndex
  },

  zoomIn (state) {
    const newValue = state.zoomLevel + ZOOM_STEP_LEVEL

    if (newValue < 2.5) {
      state.zoomLevel = newValue
    }
  },

  zoomOut (state) {
    const newValue = state.zoomLevel - ZOOM_STEP_LEVEL

    if (newValue > 0) {
      state.zoomLevel = newValue
    }
  },

  setSelectedElementIndex (state, selectedElementIndex) {
    state.selectedElementIndex = selectedElementIndex
  },

  createSlide (state) {
    if (!state.presentation) {
      console.error('Unable to create a new slide')
      return null
    }

    state.presentation.slides.push(JSON.parse(DEFAULT_NEW_SLIDE))
    state.selectedSlideIndex = state.presentation.slides.length - 1
  },

  deleteSlide (state, slideIndex) {
    if (!state.presentation.slides.length || !state.presentation.slides[slideIndex]) {
      console.error('Unable to delete slide')
      return null
    }

    return state.presentation.slides.splice(slideIndex, 1)
  },

  setBackgroundColour (state, newBackgroundColour) {
    if (!state.presentation.slides.length || !state.presentation.slides[state.selectedSlideIndex]) {
      return null
    }

    state.presentation.slides[state.selectedSlideIndex].backgroundColour = newBackgroundColour
  },

  setElementX (state, {element, value}) {
    if (!element) {
      console.error('Failed to set the X coordinate for an element (element was null)')
      return null
    }
    element.properties.x = value
  },

  setElementY (state, {element, value}) {
    if (!element) {
      console.error('Failed to set the Y coordinate for an element (element was null)')
      return null
    }
    element.properties.y = value
  },

  setElementFontFamily (state, {element, value}) {
    if (!element) {
      console.error('Failed to set the font family for an element (element was null)')
      return null
    }
    element.properties.fontFamily = value
  },

  setElementFontSize (state, {element, value}) {
    if (!element) {
      console.error('Failed to set the font size for an element (element was null)')
      return null
    }
    element.properties.fontSize = value
  },

  setElementFill (state, {element, value}) {
    if (!element) {
      console.error('Failed to set the fill for an element (element was null)')
      return null
    }
    element.properties.fill = value
  },

  setElementContent (state, {element, value}) {
    if (!element) {
      console.error('Failed to set the content for an element (element was null)')
      return null
    }
    element.properties.content = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
