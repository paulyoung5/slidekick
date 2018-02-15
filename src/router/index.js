import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = () => import('@/components/Dashboard')
const SlideEditor = () => import('@/components/SlideEditor')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {name: 'SlideEditor', path: '/editor/:slideId', component: SlideEditor},
    {name: 'Dashboard', path: '/', component: Dashboard}
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
