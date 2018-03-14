<style>

</style>

<template>
  <g>
    <rect fill="black" :x="containerX" :y="containerY" :width="containerWidth" :height="containerHeight"></rect>
    <text
      ref="textEl"
      :x="x"
      :y="y"
      font-size="10"
      font-weight="bold"
      fill="red"
    >
      PAUL
    </text>
  </g>
</template>

<script>
import elementHelpers from './helpers'

export default {
  name: 'inspecting-user-label',
  props: {
    x: Number,
    y: Number
  },
  data () {
    return {
      bbox: null
    }
  },
  computed: {
    containerX () {
      return this.bbox ? this.bbox.x - 10 : 0
    },
    containerY () {
      return this.bbox ? this.bbox.y - 10 : 0
    },
    containerWidth () {
      return this.bbox ? this.bbox.width + 20 : 0
    },
    containerHeight () {
      return this.bbox ? this.bbox.height + 20 : 0
    }
  },
  methods: {
    ...elementHelpers
  },
  watch: {
    element: {
      handler: function () {
        return this.updateBBox(this.actualEl)
      },
      deep: true
    },
    currentElement: {
      handler: function () {
        return this.updateBBox(this.actualEl)
      },
      deep: true
    },
    currentSlide: {
      handler: function () {
        return this.updateBBox(this.actualEl)
      },
      deep: true
    }
  },
  mounted () {
    this.updateBBox(this.$refs.textEl, this)
  }
}
</script>
