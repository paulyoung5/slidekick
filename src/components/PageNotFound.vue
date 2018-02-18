<style type="text/css" scoped>
  div {
    padding: 0 1em;
    
    display: grid;
    grid-gap: 2em;
    justify-items: center;
    align-content: center;
  }

  a {
    background-color: var(--primary-colour);
    color: white;
    font-weight: bold;
    padding: 1em 1.2em;
    border-radius: 100px;
    display: grid;
    grid-gap: 1em;
    grid-template-columns: auto auto;
    align-items: center;
  }

  a:hover {
    background-color: var(--primary-colour-hover);
  }

  a:hover i {
    color: rgba(0, 0, 0, 0.4);
  }
</style>

<template>
  <div>
    <h1>Page not found</h1>
    <span>Sorry, the page you're looking for doesn't exist.</span>
    <router-link to="/">
    <i class="material-icons">home</i>
    Go home
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'page-not-found'
  }
</script>