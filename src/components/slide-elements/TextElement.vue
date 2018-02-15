<style>

</style>

<template>
  <g class="hoverableElement">
    <rect
      ref="containerEl"
      class="hoverState"
      :width="containerWidth"
      :height="containerHeight"
      :x="containerX"
      :y="containerY"
    />

    <text
      ref="textEl"
      dominant-baseline="text-before-edge"
      :x="textX"
      :y="textY"
      :font-family="fontFamily"
      :font-size="fontSize"
      @mousedown="mousedown"
      @click="inspectElement(element.id)"
    >
      {{ content }}
    </text>
  </g>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'text-element',
  props: {element: Object},
  data () {
    return {
      textEl: null,
      containerEl: null
    }
  },
  computed: {
    textX () {
      return Number(this.element.properties.x.substr(0, this.element.properties.x.length - 2))
    },
    textY () {
      return Number(this.element.properties.y.substr(0, this.element.properties.y.length - 2))
    },
    textHeight () {
      if (this.textEl) {
        const boundingRect = this.textEl.getBoundingClientRect()

        return Number(boundingRect.height.toFixed(2))
      } else {
        return 0
      }
    },
    textWidth () {
      if (this.textEl) {
        const boundingRect = this.textEl.getBoundingClientRect()

        return boundingRect.width
      } else {
        return 0
      }
    },
    containerX () {
      return this.textX - 10
    },
    containerY () {
      return this.textY - 10
    },
    containerWidth () {
      return `${this.textWidth}px`
    },
    containerHeight () {
      return `${this.textHeight + 10}px`
    },
    fontFamily () {
      return this.element.properties.fontFamily
    },
    fontSize () {
      return this.element.properties.fontSize
    },
    content () {
      return this.element.properties.content
    }
  },
  methods: {
    ...mapActions(['inspectElement']),
    mousedown (event) {
      const svgEl = document.querySelector('svg')

      svgEl.addEventListener('mousemove', this.mousemove)
      svgEl.addEventListener('mouseup', this.mouseup)
    },
    mousemove (event) {
      const bounding = this.textEl.getBoundingClientRect()

      const newX = this.textX + (event.clientX - bounding.x)
      const newY = this.textY + (event.clientY - bounding.y)

      const newXformatted = newX > 0 ? Math.floor(newX) : Math.ceil(newX)
      const newYformatted = newY > 0 ? Math.floor(newY) : Math.ceil(newY)

      this.element.properties.x = `${newXformatted}px`
      this.element.properties.y = `${newYformatted}px`
    },
    mouseup (event) {
      const svgEl = document.querySelector('svg')

      svgEl.removeEventListener('mouseup', this.mouseup)
      svgEl.removeEventListener('mousemove', this.mousemove)
    }
  },
  mounted () {
    this.textEl = this.$refs.textEl
    this.containerEl = this.$refs.containerEl
  }
}
</script>
