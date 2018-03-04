<style>
</style>

<template>
  <element-wrapper :element="element">
    <image
      slot="actual-element"
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      :href="href"
    />
  </element-wrapper>
</template>

<script>
import ElementWrapper from './ElementWrapper'

export default {
  name: 'image-element',
  components: {
    'element-wrapper': ElementWrapper
  },
  props: {element: Object},
  computed: {
    href () {
      return this.element.properties.href
    },
    x () {
      return this.element.properties.x
    },
    y () {
      return this.element.properties.y
    },
    width () {
      return this.element.properties.width
    },
    height () {
      return this.element.properties.height
    }
  }
}
</script>
