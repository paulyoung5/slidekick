<style>
</style>

<template>
  <element-wrapper :element="element">
    <text
      slot="actual-element"
      dominant-baseline="hanging"
      :x="textX"
      :y="textY"
      :font-family="fontFamily"
      :font-size="fontSize"
      :fill="fill"
    >
      {{ content }}
    </text>
  </element-wrapper>
</template>

<script>
import {mapGetters} from 'vuex'
import ElementWrapper from './ElementWrapper'

export default {
  name: 'text-element',
  components: {
    'element-wrapper': ElementWrapper
  },
  props: {element: Object},
  computed: {
    ...mapGetters('editor', ['selectedElementIndex']),
    computedStyles () {
      return {
        'inspecting': (this.selectedElementIndex === this.element.id)
      }
    },
    textX () {
      return this.element.properties.x
    },
    textY () {
      return this.element.properties.y
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
  }
}
</script>
