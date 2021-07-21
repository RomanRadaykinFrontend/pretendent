import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RegistrationView from '@/views/Registration/RegistrationView.vue'
import TaskView from '@/views/Task/TaskView.vue'
import FinalPageView from '@/views/FinalPage/FinalPageView.vue'
import { testingModule } from '@/store'
import StubView from '@/views/StubView.vue'
import AdminPanelView from '@/views/AdminPanelView/AdminPanelView.vue'
import AnsViewerView from '@/views/AnswersViewerView/AnsViewerView.vue'
import { checkADFSAuth } from '../../packages/login-form'
import AdminLoginView from '@/views/AdminLoginView.vue'
import UserPermissionsView from '@/views/UserPermissionsView.vue'


Vue.use( VueRouter )

const isStub = 'false'

const isAuthorized = ( to: any, from: any, next: any ) => {
  if ( window.localStorage.getItem( 'access_token' ) !== null ) {
    next()
    return
  }
  next( '/adminlogin' )
}

const isNotAuthorized = ( to: any, from: any, next: any ) => {
  checkADFSAuth()
  if ( window.localStorage.getItem( 'access_token' ) === null ) {
    next()
    return
  }
  next( '/adminpanel' )
}



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
          testingModule.mutations.setIsModalWindowShowed( true )
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
  {
    path: '/adminpanel',
    component: AdminPanelView,
    beforeEnter: isAuthorized,
  },
  {
    path: '/answersviewer/:id',
    component: AnsViewerView,
    beforeEnter: isAuthorized,
  },
  {
    path: '/adminlogin',
    name: 'login',
    component: AdminLoginView,
    beforeEnter: isNotAuthorized,
  },
  {
    path: '/userpermissions',
    name: 'userpermissions',
    component: UserPermissionsView,
    beforeEnter: isAuthorized,
  },


]

const router = new VueRouter({
  mode: 'history',
  routes,
})



export default router
