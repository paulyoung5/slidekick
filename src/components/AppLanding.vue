<style scoped>
.landing-container {
  font-size: 1.3em;
  padding: 4em 1em 1em 1em;
  max-width: 700px;
  overflow: auto;
  margin: 0 auto;
    
  display: grid;
  grid-gap: 3em;
  align-items: start;
  justify-items: start;
  align-content: start;
}

.landing-container ul {
  list-style: none;
  justify-self: center;

  display: grid;
  grid-gap: 2em;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
}

.landing-container a {
  background-color: var(--primary-colour);
  color: white;
  font-weight: bold;
  padding: 0.7em 1.5em;
  border-radius: 100px;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: auto 1fr;
  align-items: center;
}

.landing-container a:hover {
  background-color: var(--primary-colour-hover);
  transition: 0.4s all;
}

.landing-container a:hover i {
  color: rgba(0, 0, 0, 0.4);
}
</style>

<template>
  <div class="landing-container">
    <h1>Welcome to Slidekick!</h1>
    <p>
      Slidekick is a web application for composing and presenting slides, with real-time collaboration tools.
    </p>
    <ul>
      <li>
        <router-link :to="{ name: 'auth.login' }">
          <i class="material-icons">lock</i>
          <span>Log In</span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'auth.register' }">
          <i class="material-icons">create</i>
          <span>Register</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppLanding',
  created () {
    if (this.$auth.ready() && this.$auth.check()) {
      this.$router.push('/dashboard')
    }
  }
}
</script>
