// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

import App from './App'
import auth from './auth'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.router = router

const axiosInstance = axios.create({ baseURL: '/api' })

axiosInstance.interceptors.response.use((request, next) => {
  next((res) => {
    // Unauthorized Access
    if (res.status === 401 &&
      ['UnauthorizedAccess', 'InvalidToken'].indexOf(res.data.code) > -1) {
      Vue.auth.logout({
        redirect: {name: 'auth-login'}
      })
    } else if (res.status === 500) {
      Vue.router.push({name: 'error-500'})
    }
  })
})

Vue.use(VueAxios, axiosInstance)
Vue.use(VueRouter)
Vue.use(VueAuth, auth)

/* eslint-disable no-new */
new Vue({
  el: 'main',
  store,
  router,
  template: '<App/>',
  components: { App }
})
