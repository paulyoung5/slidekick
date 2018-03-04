<style>
.editor {
  display: grid;
  grid-template-areas:
    "slides-toolbar   toolbox         inspector"
    "slides-toolbar   current-slide   inspector"
    "slides-toolbar   slide-controls  inspector";
  grid-template-columns: 250px minmax(300px, 1fr) 300px;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}

@keyframes slideInFromLeft {
  0% {
    opacity: 0.5;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  0% {
    opacity: 0.5;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromTop {
  0% {
    opacity: 0.5;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromBottom {
  0% {
    opacity: 0.5;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes highlightFlash {
  0% {
    opacity: 1;
    width: 100%;
  }
  100% {
    opacity: 0;
    width: 0;
  }
}

.editor .slides-toolbar {
  animation: 0.4s ease-in-out 0.1s 1 slideInFromLeft;
}

.editor .current-slide {
  animation: 0.4s ease-in-out 0s 1 scale;
}

.editor .inspector {
  animation: 0.4s ease-in-out 0.1s 1 slideInFromRight;
}

.inspector.changed::before {
  content: "";
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 0;
  bottom: 0;
  width: 0;
  right: 0;
  z-index: 5;
  opacity: 0;
  animation: highlightFlash 0.7s;
  -webkit-animation-iteration-count: 1;
  -moz-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

.editor .toolbox {
  animation: 0.4s ease-in-out 0.1s 1 slideInFromTop;
}

.editor .slide-controls {
  animation: 0.4s ease-in-out 0.1s 1 slideInFromBottom;
}

@media only screen 
      and (device-width : 375px) 
      and (device-height : 812px) 
      and (-webkit-device-pixel-ratio : 3) {
  .editor {
    grid-template-columns: 150px minmax(300px, 1fr) 150px;
  }
}

@media (max-width: 800px) {
  .editor {
      grid-template-columns: 1fr;
      grid-template-areas:
      "slide-controls"
      "current-slide"
      ;
  }
}
</style>

<template>
  <div class="editor" @click="clearInspector">
    <slides-toolbar></slides-toolbar>

    <toolbox></toolbox>

    <inspector></inspector>

    <slide-controls></slide-controls>

    <current-slide :selected-slide-index="selectedSlideIndex" :slides="slides" :zoom-level="zoomLevel"></current-slide>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SlidesToolbar from './SlidesToolbar.vue'
import Toolbox from './Toolbox.vue'
import Inspector from './Inspector.vue'
import SlideControls from './SlideControls.vue'
import CurrentSlide from './CurrentSlide.vue'

export default {
  name: 'editor',
  components: {
    'slides-toolbar': SlidesToolbar,
    'toolbox': Toolbox,
    'inspector': Inspector,
    'slide-controls': SlideControls,
    'current-slide': CurrentSlide
  },
  created () {
    this.$store.dispatch('editor/fetchPresentation', this.$route.params.presentationId)
  },
  computed: {
    ...mapGetters('editor', ['slides', 'selectedSlideIndex', 'selectedElementIndex', 'zoomLevel'])
  },
  methods: {
    inspectElement (index) {
      this.$store.commit('editor/setSelectedElementIndex', index)
    },
    clearInspector (e) {
      if (e.target.tagName === 'svg') {
        this.$store.commit('editor/setSelectedElementIndex', null)
      }
    }
  }
}
</script>
