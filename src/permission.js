import router from '@/router'
import store from '@/store'

const WhileList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    to.path === '/login' ? next('/') : next()
  } else {
    WhileList.includes(to.path) ? next() : next('/login')
  }
})
