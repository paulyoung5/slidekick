<style scoped>
  .colour-picker {
    display: grid;
    grid-template-columns: 1fr auto;
    position: relative;
  }

  .colour-picker input::before {
    content: "";
    display: inline-block;
    background-color: red;
    padding: 5px;
  }

  .colour-picker .picker {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
  }
</style>

<template>
  <div class="colour-picker">
    <input type="text" :value="hex" @focus.stop="active = true">
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
    }
  }
}
</script>
