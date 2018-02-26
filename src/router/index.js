import VueRouter from 'vue-router'

const AppLanding = () => import('@/components/AppLanding')

const Dashboard = () => import('@/components/Dashboard')
const Editor = () => import('@/components/Editor')
const PageNotFound = () => import('@/components/PageNotFound')

const showLoading = {showLoading: true}

export default new VueRouter({
  mode: 'history',
  routes: [
    {name: 'landing', path: '/', component: AppLanding},
    {name: 'editor', path: '/editor/:presentationId', component: Editor, meta: showLoading},
    {name: 'dashboard', path: '/dashboard', component: Dashboard, meta: showLoading},
    {name: 'page-not-found', path: '*', component: PageNotFound}
  ],
  scrollBehavior (to, from, savedPosition) {
    let position = { x: 0, y: 0 }
    // Keep scroll position when using browser buttons
    if (savedPosition) {
      position = savedPosition
    }

    // Workaround for transitions scrolling to the top of the page
    // However, there are still some problems being fixed by the vue team
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position)
      }, 1000)
    })
  }
})
