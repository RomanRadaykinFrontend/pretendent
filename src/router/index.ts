import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RegistrationView from '@/views/Registration/RegistrationView.vue'
import TaskView from '@/views/Task/TaskView.vue'
import FinalPageView from '@/views/FinalPage/FinalPageView.vue'
import StubView from '@/views/StubView.vue'
import { commonModule } from '@/store'


Vue.use( VueRouter )

const isStub = 'false'


const routes: Array<RouteConfig> = [
  {
    path: '/',
    beforeEnter: ( to, from, next ) => {
      if( isStub === 'false' ){
        if( localStorage.getItem( 'isAuthorized' ) === 'true' ){
          next({ path: `/questions/${localStorage.task}` })
        } else {
          next({ path: '/login' })
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
        if( localStorage.getItem( 'isAuthorized' ) === 'true' ){
          commonModule.mutations.setIsModalWindowShowed( true )
          next()
        }
        next()
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
      if( isStub === 'false' ){
        if ( localStorage.getItem( 'isAuthorized' ) === 'false' ){
          next( '/login' )
        } else {
          next()
        }
      } else {
        next({ path: '/welcome' })
      }
    },
  },
  {
    path: '/final',
    name: 'FinalPageView',
    component: FinalPageView,
    beforeEnter: ( to, from, next ) => {
      if( isStub === 'false' ){
        if( localStorage.getItem( 'isAuthorized' ) === 'false' || !localStorage.getItem( 'isAuthorized' ) ){
          next({ path: '/login' })
        }  else {
          localStorage.setItem( 'isAuthorized', 'false' )
          localStorage.removeItem( 'timeRemain' )
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
  routes,
})



export default router
