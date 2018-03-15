import axios from 'axios'
import Vue from 'vue'

const axiosInstance = axios.create({ baseURL: '/api' })
axios.defaults.headers.common.Authorization = `Bearer ${localStorage['jwt-token']}`
axiosInstance.interceptors.response.use((res) => {
  // Unauthorized Access
  if (res.status === 401 &&
    ['UnauthorizedAccess', 'InvalidToken'].indexOf(res.data.code) > -1) {
    Vue.auth.logout({
      redirect: {name: 'landing'}
    })
  } else if (res.status === 500) {
    Vue.router.push({name: 'landing'})
  } else if (res.status === 404) {
    // TODO: add 404 component
    Vue.auth.logout()
  }
  return res
})

export default axiosInstance
