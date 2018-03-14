<template>
  <div class="landing-container">
    <div class="content">
      <h1>Welcome to Slidekick</h1>
      <p>
        <router-link :to="{ name: 'auth.login' }">Log In</router-link> &bullet;
        <router-link :to="{ name: 'auth.register' }">Register</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.landing-container .content {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
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
