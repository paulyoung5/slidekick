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
    <input readonly type="text" :value="hex" @focus.stop="active = true">
    <div class="preview" :style="previewStyle" @click.stop="active = true"></div>
    <div class="picker" v-show="active">
      <compact-picker v-model="hex"></compact-picker>
    </div>
  </div>
</template>

<script>
import { Compact as CompactPicker } from 'vue-color'

export default {
  name: 'colour-picker',
  components: {
    'compact-picker': CompactPicker
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
        this.active = false
        return this.$emit('update:value', value)
      }
    },
    previewStyle () {
      return {
        'background-color': this.value
      }
    }
  }
}
</script>
