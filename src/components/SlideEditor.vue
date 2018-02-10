<style>
.app {
  display: grid;
  grid-template-areas:
    "top-bar          top-bar         top-bar"
    "slides-toolbar   toolbox         inspector"
    "slides-toolbar   current-slide   inspector"
    "slides-toolbar   slide-controls  inspector";
  grid-template-columns: 250px minmax(300px, 1fr) 300px;
  grid-template-rows: auto auto 1fr auto;
  overflow: hidden;
}

@media (max-width: 800px) {
  .app {
      grid-template-columns: 1fr;
      grid-template-areas:
      "top-bar"
      "slide-controls"
      "current-slide"
      ;
  }
}
</style>

<template>
  <div class="app">
    <top-bar :title="title"></top-bar>

    <slides-toolbar :selected.sync="selectedSlideIndex" :slides="slides"></slides-toolbar>

    <toolbox></toolbox>

    <inspector :slide="currentSlide" :selected-element-index="selectedElementIndex"></inspector>

    <slide-controls :zoom-level.sync="zoomLevel"></slide-controls>

    <current-slide
      :slide="currentSlide"
      :selected-element-index="selectedElementIndex"
      :zoom-level="zoomLevel"
      :inspect="inspectElement"
    ></current-slide>
  </div>
</template>

<script>
import TopBar from './TopBar.vue'
import SlidesToolbar from './SlidesToolbar.vue'
import Toolbox from './Toolbox.vue'
import Inspector from './Inspector.vue'
import SlideControls from './SlideControls.vue'
import CurrentSlide from './CurrentSlide.vue'

export default {
  name: 'slide-editor',
  components: {
    'top-bar': TopBar,
    'slides-toolbar': SlidesToolbar,
    'toolbox': Toolbox,
    'inspector': Inspector,
    'slide-controls': SlideControls,
    'current-slide': CurrentSlide
  },
  data () {
    return {
      selectedSlideIndex: 0,
      zoomLevel: 1,
      selectedElementIndex: -1,

      title: 'My first presentation',
      slides: [
        {
          backgroundColour: '#FFFFFF',
          elements: [
            {
              id: 0,
              type: 'TEXT',
              properties: {
                x: '100px',
                y: '100px',
                fontFamily: 'Verdana',
                fontSize: 30,
                content: 'Slide 1'
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    currentSlide () {
      return this.slides[this.selectedSlideIndex]
    }
  },
  methods: {
    inspectElement (index) {
      this.selectedElementIndex = index
    }
  }
}
</script>
