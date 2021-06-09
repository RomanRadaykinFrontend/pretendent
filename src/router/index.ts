import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RegistrationView from '@/views/Registration/RegistrationView.vue'
import TaskView from '@/views/Task/TaskView.vue'
import FinalPageView from '@/views/FinalPage/FinalPageView.vue'
import { commonModule } from '@/store'


Vue.use( VueRouter )

const routes: Array<RouteConfig> = [
  {
    path: '/',
    beforeEnter: ( to, from, next ) => {
      next({ path: '/login' })
    },
  },
  {
    path: '/login',
    name: 'RegistrationView',
    component: RegistrationView,
  },
  {
    path: '/questions/:id',
    name: 'TaskView',
    component: TaskView,
  },
  {
    path: '/final',
    name: 'FinalPageView',
    component: FinalPageView,
    beforeEnter: ( to, from, next ) => {
      if( !commonModule.getters.isAuthorized ){
        next({ path: '/login' })
      } else{
        next()
      }
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach( ( to, from, next ) => {
  if( from.path === '/final' ){
    next({ path: '/login' })
  } else {
    next()
  }
})



export default router
