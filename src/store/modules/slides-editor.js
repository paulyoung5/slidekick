import Vue from 'vue'
import * as api from '../../api/presentation'
import io from 'socket.io-client'
import socketMutations from './socket-mutations'

const state = {
  socket: null,
  selectedSlideIndex: 0,
  zoomLevel: 1,
  selectedElementIndex: -1,
  activeUsers: [],

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
        fontSize: '15px',
        content: 'Slide body text'
      }
    }
  ]
})
const DEFAULT_NEW_TEXT = JSON.stringify({
  type: 'TEXT',
  properties: {
    x: '210px',
    y: '140px',
    fill: '#000000',
    fontFamily: 'Verdana',
    fontSize: '15px',
    content: 'New text box'
  }
})
const DEFAULT_NEW_IMAGE = JSON.stringify({
  type: 'IMAGE',
  properties: {
    x: '265px',
    y: '45px',
    width: '150px',
    height: '150px',
    href: 'https://picsum.photos/150'
  }
})

const getters = {
  socket: state => state.socket,
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
  slides: state => state.presentation ? state.presentation.slides : [],
  zoomLevel: state => state.zoomLevel,
  activeUsers: state => state.activeUsers
}

const actions = {
  initSocket ({commit}) {
    commit('initSocket')
  },

  async fetchPresentation ({ commit }, presentationId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await api.getPresentation(presentationId)

        commit('setPresentation', res.data.presentation)
        commit('setPageLoading', false, { root: true })
        resolve()
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  },

  async renamePresentation ({ commit }, { presentationId, socket, newTitle }) {
    commit('notifyRenamedPresentation', {title: newTitle})
    return new Promise(async (resolve, reject) => {
      try {
        if (!newTitle) {
          return window.alert(`The entered title wasn't valid. Please try again.`)
        }

        const res = await api.getPresentation(presentationId)
        const p = JSON.parse(JSON.stringify(res.data.presentation))
        p.title = newTitle

        return api.savePresentation(p)
          .then(res => {
            commit('setPresentation', res.data.presentation)
            console.info('Presentation successfully renamed')
            resolve()
          })
          .catch(res => window.alert(res.err.message))
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  },

  zoomIn ({ commit }) {
    commit('zoomIn')
  },

  zoomOut ({ commit }) {
    commit('zoomOut')
  },

  updateTitle ({ commit }, value) {
    commit('setTitle', value)
  },

  selectSlideFromList ({ commit }, selectedSlideIndex) {
    commit('setSelectedSlideIndex', selectedSlideIndex)
  },

  createSlide ({ commit }) {
    commit('createSlide')
  },

  replaceSlide ({ commit }, {slideIndex, slide}) {
    commit('replaceSlide', {slideIndex, slide})
  },

  deleteSlide ({ commit }, slideIndex) {
    const confirm = window.confirm('Are you sure you want to delete this slide?')
    if (confirm) {
      commit('deleteSlide', slideIndex)
    }
  },

  moveSlide ({ commit }, { draggingSlideIndex, replaceSlideIndex }) {
    commit('moveSlide', { draggingSlideIndex, replaceSlideIndex })
  },

  setSlides ({ commit }, slides) {
    commit('setSlides', slides)
  },

  setElements ({commit}, {slideIndex, elements}) {
    commit('setElements', {slideIndex, elements})
  },

  setUsersList ({commit}, usersList) {
    commit('setUsersList', usersList)
  },

  createText ({ commit }, socket) {
    commit('createText')
    commit('notifyCreatedElement', socket)
  },

  createImage ({ commit }) {
    const url = window.prompt('Please enter the URL of new image')
    const height = window.prompt('Please enter the height (in pixels)')
    const width = window.prompt('Please enter the width (in pixels)')

    if (!url || !height || !width) {
      window.alert('Please enter a valid image URL, height (pixels) and width (pixels)')
      return null
    }

    commit('createImage', { url, height, width })
  },

  inspectElement ({ commit }, selectedElementIndex) {
    commit('setSelectedElementIndex', selectedElementIndex)
  },

  deleteElement ({ commit }, selectedElementIndex) {
    const confirm = window.confirm('Are you sure you want to delete this?')
    if (confirm) {
      commit('deleteElement', selectedElementIndex)
    }
  },

  updateBackgroundColour ({ commit }, value) {
    commit('setBackgroundColour', value)
  },

  updateX ({ commit }, { element, value }) {
    commit('setElementX', { element, value })
  },

  updateY ({ commit }, { element, value }) {
    commit('setElementY', { element, value })
  },

  updateCoordinates ({ commit }, { element, x, y }) {
    commit('setElementCoordinates', { element, x, y })
  },

  updateFontFamily ({ commit }, { element, value }) {
    commit('setElementFontFamily', { element, value })
  },

  updateFontSize ({ commit }, { element, value }) {
    commit('setElementFontSize', { element, value })
  },

  updateFill ({ commit }, { element, value }) {
    commit('setElementFill', { element, value })
  },

  updateContent ({ commit }, { element, value }) {
    commit('setElementContent', { element, value })
  }
}

const mutations = {
  initSocket (state) {
    // var address = window.location.origin
    // address += ':3000'
    var address = 'https://slidekick.daniel-waghorn.com:3000/'
    state.socket = io(address)
  },

  ...socketMutations,

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
    state.selectedElementIndex = null
  },

  setElements (state, {slideIndex, elements}) {
    state.presentation.slides[slideIndex].elements = elements
  },

  setUsersList ({commit}, usersList) {
    state.activeUsers = usersList
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

    state.socket.emit('modified-slides', {
      presentationId: state.presentation.id,
      slides: state.presentation.slides
    })
  },

  deleteSlide (state, slideIndex) {
    if (!state.presentation.slides.length || !state.presentation.slides[slideIndex]) {
      console.error('Unable to delete slide')
      return null
    }

    // Remove the slide
    state.presentation.slides.splice(slideIndex, 1)

    // Now show the next slide, or find something else to show
    if (!state.presentation.slides[slideIndex]) {
      if (state.presentation.slides[slideIndex - 1] !== null) {
        state.selectedSlideIndex = slideIndex - 1
      } else if (state.presentation.slides.length) {
        state.selectedSlideIndex = state.presentation.slides.length - 1
      } else {
        state.selectedSlideIndex = 0
      }
    }

    state.socket.emit('modified-slides', {
      presentationId: state.presentation.id,
      slides: state.presentation.slides
    })
  },

  moveSlide (state, { draggingSlideIndex, replaceSlideIndex }) {
    if (!state.presentation.slides.length ||
      !state.presentation.slides[draggingSlideIndex] ||
      !state.presentation.slides[replaceSlideIndex]) {
      console.error('Unable to move slide')
      return null
    }

    state.presentation.slides.splice(draggingSlideIndex, 0, state.presentation.slides.splice(replaceSlideIndex, 1)[0])
    state.selectedSlideIndex = replaceSlideIndex
    state.socket.emit('modified-slides', {
      presentationId: state.presentation.id,
      slides: state.presentation.slides
    })
  },

  createText (state) {
    if (!state.presentation || !state.presentation.slides[state.selectedSlideIndex]) {
      console.error('Unable to create new text element: no active presentation and/or slide')
      return null
    }
    const newTextElement = JSON.parse(DEFAULT_NEW_TEXT)
    const newElementId = Date.now()
    newTextElement.id = newElementId
    state.presentation.slides[state.selectedSlideIndex].elements.push(newTextElement)
    state.selectedElementIndex = newElementId
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  createImage (state, { url, height, width }) {
    if (!state.presentation || !state.presentation.slides[state.selectedSlideIndex]) {
      console.error('Unable to create new image element: no active presentation and/or slide')
      return null
    }
    const newImageElement = JSON.parse(DEFAULT_NEW_IMAGE)
    newImageElement.properties.href = url
    newImageElement.properties.width = width
    newImageElement.properties.height = height
    const newElementId = Date.now()
    newImageElement.id = newElementId
    state.presentation.slides[state.selectedSlideIndex].elements.push(newImageElement)
    state.selectedElementIndex = newElementId
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  deleteElement (state, selectedElementIndex) {
    if (!state.presentation.slides.length ||
      !state.presentation.slides[state.selectedSlideIndex].elements.length ||
      !state.presentation.slides[state.selectedSlideIndex].elements.find(el => el.id === selectedElementIndex)
    ) {
      console.error('Unable to delete element')
    }

    const slide = state.presentation.slides[state.selectedSlideIndex]
    slide.elements = slide.elements.filter(el => el.id !== selectedElementIndex)
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  setBackgroundColour (state, newBackgroundColour) {
    if (!state.presentation.slides.length || !state.presentation.slides[state.selectedSlideIndex]) {
      return null
    }

    state.presentation.slides[state.selectedSlideIndex].backgroundColour = newBackgroundColour
    state.socket.emit('changed-slide-background-colour', {
      slideIndex: state.selectedSlideIndex,
      slide: state.presentation.slides[state.selectedSlideIndex]
    })
  },

  replaceSlide (state, {slideIndex, slide}) {
    Vue.set(state.presentation.slides, slideIndex, slide)
  },

  setElementX (state, { element, value }) {
    if (!element) {
      console.error('Failed to set the X coordinate for an element (element was null)')
      return null
    }
    element.properties.x = value
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  setElementY (state, { element, value }) {
    if (!element) {
      console.error('Failed to set the Y coordinate for an element (element was null)')
      return null
    }
    element.properties.y = value
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  setElementCoordinates (state, { element, x, y }) {
    if (!element) {
      console.error('Failed to set coordinates for an element (element was null)')
      return null
    }
    element.properties.x = x
    element.properties.y = y
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  setElementFontFamily (state, { element, value }) {
    if (!element) {
      console.error('Failed to set the font family for an element (element was null)')
      return null
    }
    element.properties.fontFamily = value
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  setElementFontSize (state, { element, value }) {
    if (!element) {
      console.error('Failed to set the font size for an element (element was null)')
      return null
    }
    element.properties.fontSize = value
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  setElementFill (state, { element, value }) {
    if (!element) {
      console.error('Failed to set the fill for an element (element was null)')
      return null
    }
    element.properties.fill = value
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
    })
  },

  setElementContent (state, { element, value }) {
    if (!element) {
      console.error('Failed to set the content for an element (element was null)')
      return null
    }
    element.properties.content = value
    state.socket.emit('modified-elements', {
      slideIndex: state.selectedSlideIndex,
      elements: state.presentation.slides[state.selectedSlideIndex].elements
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
