import Vue from 'vue'
import Router from 'vue-router'
import SlideEditor from '@/components/SlideEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SlideEditor',
      component: SlideEditor
    }
  ]
})
