<style>

</style>

<template>
  <div>
    {{ value }}
    <!-- <colour-picker v-model="value"></colour-picker> -->
  </div>
</template>

<script>
import { Compact as CompactPicker } from 'vue-color'

export default {
  name: 'colour-picker',
  components: {
    'colour-picker': CompactPicker
  },
  props: {
    value: String
  }
}
</script>
