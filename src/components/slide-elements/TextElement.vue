<style scoped>
  @keyframes rotateDashes {
    0% {
      stroke-dashoffset: 0;
    }

    100% {
      stroke-dashoffset: 60;
    }
  }

  g:hover {
    cursor: pointer;
  }

  g:hover .bbox {
    stroke: rgba(0, 0, 0, 0.4);
  }

  g.inspecting .bbox {
    stroke-linecap: round;
    stroke: rgba(0, 0, 0, 0.6);
    stroke-dasharray: 15px;
    animation: rotateDashes 5s infinite linear;
  }
</style>

<template>
  <g :class="computedStyles">
    <rect class="bbox" ref="containerEl" :width="containerWidth" :height="containerHeight" :x="containerX" :y="containerY" fill="none" stroke-width="2px" stroke="none" />
    <text
      ref="textEl"
      dominant-baseline="hanging"
      :x="textX"
      :y="textY"
      :font-family="fontFamily"
      :font-size="fontSize"
      :fill="fill"
      @mouseover="updateBBox"
      @click.stop="inspectElement(element.id)"
    >
      {{ content }}
    </text>
  </g>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'text-element',
  props: {element: Object},
  data () {
    return {
      textEl: null,
      containerEl: null,
      bbox: null
    }
  },
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
  watch: {
    element: {
      handler: function () {
        return this.updateBBox()
      },
      deep: true
    },
    currentElement: {
      handler: function () {
        return this.updateBBox()
      },
      deep: true
    },
    currentSlide: {
      handler: function () {
        return this.updateBBox()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('editor', ['inspectElement', 'currentElement', 'currentSlide', 'updateCoordinates']),
    updateBBox () {
      return this.$nextTick(() => {
        try {
          this.bbox = this.textEl.getBBox()
        } catch (_) {
          // Workaround for FF bug #612118 (https://bugzilla.mozilla.org/show_bug.cgi?id=612118)
          // getBBox() will throw an exception if the element
          // is not attached and rendered, but there is no reliable way to check for this
          setTimeout(() => {
            // Try again in 3 seconds
            this.updateBBox()
          }, 3000)
        }
      })
    }
  },
  mounted () {
    this.containerEl = this.$refs.containerEl
    this.textEl = this.$refs.textEl
    this.updateBBox()
  }
}
</script>
