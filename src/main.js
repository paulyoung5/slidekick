// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

import App from './App'
import api from './api'
import auth from './auth'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.router = router

Vue.use(VueAxios, api)
Vue.use(VueRouter)
Vue.use(VueAuth, auth)

/* eslint-disable no-new */
window.App = new Vue({
  el: 'main',
  store,
  router,
  template: '<App/>',
  components: { App }
})
