<template>
  <div class="landing-container">
    <div class="content">
      <h1>Welcome to Slidekick</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-container {
  display: table;
  text-align: center;
  min-height: 100vh;

  .content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
}
</style>

<script>
export default {
  name: 'AppLanding',
  created () {
    // if (this.$auth.ready()) this.$router.go({ name: 'dashboard' })
  }
}
</script>
