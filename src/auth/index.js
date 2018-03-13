import store from '@/store'

import { AUTHENTICATE_USER } from '@/store/mutations'

export default {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: { url: 'user/login', method: 'POST', fetchUser: true },
  logoutData: { url: 'user/logout', method: 'POST', redirect: '/', makeRequest: false },
  fetchData: { url: 'user/me', method: 'GET', enabled: true },
  registerData: { url: 'user/register', method: 'POST', fetchUser: true },
  refreshData: { url: 'user/refresh', method: 'POST', enabled: true, interval: 2, showProgressBar: false },
  parseUserData (req) {
    let u = null
    if (req.user) u = req.user
    store.commit(AUTHENTICATE_USER, u)
    return u
  }
}
