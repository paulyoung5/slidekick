export default {
  updateBBox (el) {
    return this.$nextTick(() => {
      try {
        this.bbox = el.getBBox()
      } catch (_) {
        // Workaround for FF bug #612118 (https://bugzilla.mozilla.org/show_bug.cgi?id=612118)
        // getBBox() will throw an exception if the element
        // is not attached and rendered, but there is no reliable way to check for this
        setTimeout(() => {
          // Try again in 3 seconds
          this.updateBBox(el)
        }, 3000)
      }
    })
  }
}
