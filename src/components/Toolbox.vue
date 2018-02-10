<style>
.toolbox {
  grid-area: toolbox;
  background-color: rgba(0, 0, 0, 0.4);
  list-style: none;
  z-index: 2;
  
  display: flex;
}

.toolbox li {
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.toolbox li a {
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbox li:hover a,
.toolbox li a:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 800px) {
  .toolbox {
    display: none;
  }
}
</style>

<template>
  <ul class="toolbox">
    <li>
      <a href="#">
        <i class="material-icons">text_fields</i>
      </a>
    </li>

    <li>
      <a href="#">
        <i class="material-icons">photo</i>
      </a>
    </li>

    <li>
      <a href="#">
        <i class="material-icons">photo</i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'toolbox'
}
</script>
