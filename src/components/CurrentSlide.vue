<style>
.current-slide {
  grid-area: current-slide;
  grid-row: 2 / -1;
  
  overflow: hidden;
  
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 3em;
}

.current-slide svg {
  max-height: 100vh;
  max-width: 100vh;
  
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

@media (max-width: 800px) {
  .current-slide svg {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>

<template>
  <div class="current-slide">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 300" preserveAspectRatio="xMinYMax meet" :style="slideProperties">
      <text-element
        v-for="textElement in textElements"
        :key="textElement.id"
        :element="textElement"
        @inspect="inspect(textElement)"
      ></text-element>
    </svg>
  </div>
</template>

<script>
import TextElement from './slide-elements/TextElement'

export default {
  name: 'current-slide',
  props: {zoomLevel: Number, slide: Object, selectedElementIndex: Number},
  components: {
    'text-element': TextElement
  },
  computed: {
    selectedElement () {
      return (this.slide.elements.length &&
              this.selectedElementIndex >= 0)
        ? this.slide.elements.find(el => el.id === this.selectedElementIndex)
        : null
    },
    textElements () {
      return this.slide.elements.filter(el => el.type === 'TEXT')
    },
    imageElements () {
      return this.slide.elements.filter(el => el.type === 'IMAGE')
    },
    slideProperties () {
      return {
        '--canvas-zoom-level': this.zoomLevel,
        '--canvas-background-colour': this.slide.backgroundColour
      }
    }
  },
  methods: {
    inspect (element) {
      console.log('inspect called from currentslide')
      this.$emit('inspect', element.id)
    }
  }
}
</script>
