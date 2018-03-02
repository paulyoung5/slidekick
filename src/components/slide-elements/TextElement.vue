<style>
  text:hover {
    cursor: default;
  }
</style>

<template>
  <text
    ref="textEl"
    dominant-baseline="hanging"
    :x="textX"
    :y="textY"
    :font-family="fontFamily"
    :font-size="fontSize"
    :fill="fill"
    @click.stop="inspectElement(element.id)"
  >
    {{ content }}
  </text>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'text-element',
  props: {element: Object},
  data () {
    return {
      textEl: null
    }
  },
  computed: {
    textX () {
      return this.element.properties.x
    },
    textY () {
      return this.element.properties.y
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
    },
    fill () {
      return this.element.properties.fill
    }
  },
  methods: {
    ...mapActions('editor', ['inspectElement'])
  },
  mounted () {
    this.textEl = this.$refs.textEl
  }
}
</script>
