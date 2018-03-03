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
    stroke: var(--primary-colour);
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
      return this.bbox ? `${this.bbox.width + 20}px` : '0px'
    },
    containerHeight () {
      return this.bbox ? `${this.bbox.height + 20}px` : '0px'
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
    'element': {
      handler: function () {
        return this.$nextTick(() => {
          this.bbox = this.textEl ? this.textEl.getBBox() : null
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('editor', ['inspectElement']),
    updateBBox () {
      return this.$nextTick(() => {
        this.bbox = this.textEl ? this.textEl.getBBox() : null
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
