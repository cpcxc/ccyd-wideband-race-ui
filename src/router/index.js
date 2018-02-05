import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Finish from '@/components/Finish'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/finish',
      name: 'Finsih',
      component: Finish
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path != '/finish' && router.app.finish) {
    next({path: '/finish'})
  } else if(to.path != '/' && !router.app.finish) {
      next({path: '/'})
    } else {
      next() // 确保一定要调用 next()
  }
})

export default router