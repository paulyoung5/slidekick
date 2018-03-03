<style scoped>
  .colour-picker {
    display: grid;
    grid-template-areas: "input preview";
    position: relative;
  }

  .colour-picker input {
    grid-area: input;
    grid-column: 1 / -1;
  }

  .colour-picker .preview {
    grid-area: preview;
    cursor: pointer;
    padding: 8px;
    border-radius: 10px;
    margin: 5px;
    z-index: 2;
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.4);
  }

  .colour-picker .picker {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
  }
</style>

<template>
  <div class="colour-picker">
    <input ref="field" readonly type="text" :value="hex" @focus="active = true" @keyup.esc="active = false" @blur.passive="active = false">
    <div class="preview" :style="previewStyle" @click="active = true"></div>
    <div class="picker" @mousedown.prevent="onMousedown" v-show="active">
      <compact-picker v-model="hex" :disableAlpha="true"></compact-picker>
    </div>
  </div>
</template>

<script>
import { Sketch as Picker } from 'vue-color'

export default {
  name: 'colour-picker',
  components: {
    'compact-picker': Picker
  },
  props: {
    value: String
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    hex: {
      get () {
        return this.value
      },
      set ({hex: value}) {
        return this.$emit('update:value', value)
      }
    },
    previewStyle () {
      return {
        'background-color': this.value
      }
    }
  },
  methods: {
    onMousedown () {
      // Prevent loss of focus from input event when using colour picker
      this.$refs.field.focus()
    }
  }
}
</script>
