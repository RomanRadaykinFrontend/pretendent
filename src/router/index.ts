import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RegistrationView from '@/views/Registration/RegistrationView.vue'
import TaskView from '@/views/Task/TaskView.vue'
import FinalPageView from '@/views/FinalPage/FinalPageView.vue'
import { commonModule } from '@/store'
import StubView from '@/views/StubView.vue'


Vue.use( VueRouter )

const isStub = process.env.VUE_APP_SHOW_STUB


const routes: Array<RouteConfig> = [
  {
    path: '/',
    beforeEnter: ( to, from, next ) => {
      if( isStub === 'true' ){
        next({ path: '/welcome' })
      } else {
        next({ path: '/login' })
      }
    },
  },
  {
    path: '/welcome',
    name: 'StubView',
    component: StubView,
  },
  {
    path: '/login',
    name: 'RegistrationView',
    component: RegistrationView,
    beforeEnter: ( to, from, next ) => {
      if( isStub === 'true' ){
        next({ path: '/welcome' })
      } else {
        next()
      }
    },
  },
  {
    path: '/questions/:id',
    name: 'TaskView',
    component: TaskView,
    beforeEnter: ( to, from, next ) => {
      if( isStub === 'true' ){
        next({ path: '/welcome' })
      } else {
        next()
      }
    },
  },
  {
    path: '/final',
    name: 'FinalPageView',
    component: FinalPageView,
    beforeEnter: ( to, from, next ) => {
      debugger

      if( isStub === 'false' ){
        if( !commonModule.getters.isAuthorized ){
          next({ path: '/login' })
        } else {
          next()
        }
      } else {
        next({ path: '/welcome' })
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
