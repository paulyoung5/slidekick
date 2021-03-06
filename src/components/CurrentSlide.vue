<style>
.current-slide {
  grid-area: current-slide;
  grid-row: 1 / -1;
  
  overflow: hidden;
  display: grid;
  align-items: center;
  justify-items: center;
}

.editor .current-slide {
  padding: 3em;
}

.presenter .current-slide svg {
  /* Styles to preserve 5:3 aspect ratio */

  width: 100vw;
  height: 60vw; /* 3/5 = 0.6 */
  max-height: 100vh;
  max-width: 166.66vh; /* 5/3 = 1.6666 */
}

.current-slide svg {
  background-color: var(--canvas-background-colour);
  outline: 3px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  
  transform: scale(var(--canvas-zoom-level));
}

.current-slide svg .hoverableElement .hoverState {
  visibility: hidden;
}

.current-slide svg .hoverableElement:hover .hoverState {
  visibility: visible;
  fill: none;
  stroke: rgba(0, 0, 0, 0.4);
  stroke-width: 2px;
  stroke-dasharray: 4;
  stroke-linecap: square;
}

.current-slide svg .hoverableElement:hover {
  cursor: move;
}

.presenter .current-slide {
  background-color: black;
  padding: 0;
}

.presenter .current-slide svg {
  background-color: var(--canvas-background-colour);
  outline: none;
  box-shadow: none;
}

.presenter .current-slide,
.presenter .current-slide > * {
  cursor: default;
}

@keyframes fadeIn {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes slideDown {
  0% {
    opacity: 0.5;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  0% {
    opacity: 0.5;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  0% {
    opacity: 0.5;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  0% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.presenter .current-slide.fadeIn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: white;
  z-index: 10;
  animation: 1s ease-in-out 0.1s 1 fadeIn;
}

.presenter .current-slide.slideDown {
  animation: 0.4s ease-in-out 0.1s 1 slideDown;
  transform: none;
}

.presenter .current-slide.slideUp {
  animation: 0.4s ease-in-out 0.1s 1 slideUp;
  transform: none;
}

.presenter .current-slide.slideInRight {
  animation: 0.4s ease-in-out 0.1s 1 slideInRight;
  transform: none;
}

.presenter .current-slide.scaleIn {
  animation: 0.4s ease-in-out 0.1s 1 scaleIn;
  transform: none;
}
</style>

<template>
  <div class="current-slide">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" preserveAspectRatio="xMinYMax meet" :style="slideProperties">
      <image-element
        v-for="imageElement in imageElements.reverse()"
        :key="imageElement.id"
        :element="imageElement"
      ></image-element>
      
      <text-element
        v-for="textElement in textElements.reverse()"
        :key="textElement.id"
        :element="textElement"
      ></text-element>
    </svg>
  </div>
</template>

<script>
import TextElement from './slide-elements/TextElement'
import ImageElement from './slide-elements/ImageElement'

export default {
  name: 'current-slide',
  props: {
    slides: {type: Array, default: []},
    selectedSlideIndex: {type: Number, default: 0},
    zoomLevel: {type: Number, default: 1}
  },
  components: {
    'text-element': TextElement,
    'image-element': ImageElement
  },
  computed: {
    currentSlide () {
      return this.slides.length && this.slides[this.selectedSlideIndex] ? this.slides[this.selectedSlideIndex] : null
    },
    textElements () {
      return this.currentSlide ? this.currentSlide.elements.filter(el => el.type === 'TEXT') : []
    },
    imageElements () {
      return this.currentSlide ? this.currentSlide.elements.filter(el => el.type === 'IMAGE') : []
    },
    slideProperties () {
      return {
        '--canvas-zoom-level': this.zoomLevel,
        '--canvas-background-colour': this.currentSlide ? this.currentSlide.backgroundColour : '#FFFFFF'
      }
    },
    presenterMode () {
      return this.$route.name === 'presenter'
    }
  }
}
</script>
