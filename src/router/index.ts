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
      if( isStub === 'false' ){
        if( commonModule.getters.isTestingFinished ){
          next({ path: '/final' })
        } else if( !commonModule.getters.isAuthorized ){
          next({ path: '/login' })
        } else {
          next({ path: `/questions/${localStorage.task}` })
        }
      } else {
        next({ path: '/welcome' })
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
      if( isStub === 'false' ) {
        if( commonModule.getters.isTestingFinished ){
          next({ path: '/final' })
        } else {
          next()
        }
      } else {
        next({ path: '/welcome' })
      }

    },
  },
  {
    path: '/questions/:id',
    name: 'TaskView',
    component: TaskView,
    beforeEnter: ( to, from, next ) => {
      if( commonModule.getters.isTestingFinished ){
        next({ path: '/final' })
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
      if( isStub === 'false' ){
        if( !commonModule.getters.isAuthorized ){
          next({ path: '/login' })
        }  else {
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



export default router
