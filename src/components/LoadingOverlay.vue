<style type="text/css">
.loading-overlay {
  background-color: var(--dark-grey);
  color: rgba(0, 0, 0, 0.7);
  font-size: 2em;

  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

svg path {
  fill: none;
  stroke-width: 5px;
  stroke: var(--primary-colour);
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  stroke-linecap: round;
  animation: dash 1.8s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

.loading-enter-active, .loading-leave-active {
  transition: opacity .3s;
}
.loading-enter, .loading-leave-to {
  opacity: 0;
}
</style>

<template>
    <transition name="loading">
      <div class="loading-overlay" v-show="show">
        <svg preserveAspectRatio="xMidYMid meet" width="100" height="100" vector-effect="non-scaling-stroke" viewBox="-5 0 165 117" xmlns="http://www.w3.org/2000/svg">
          <path d="M91 97L25 20H10a10 10 0 1 1 0-20h135a10 10 0 0 1 0 20H63l66 77h16a10 10 0 0 1 0 20H10a10 10 0 0 1 0-20h81z" />
        </svg>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'loading-overlay',
  props: {show: Boolean}
}
</script>