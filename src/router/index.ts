import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppTask from '@/views/AppTask.vue'
import AppFinalPage from '@/views/AppFinalPage.vue'
import AppRegistration from '@/views/AppRegistration.vue'

Vue.use( VueRouter )

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'AppRegistration',
    component: AppRegistration,
  },
  {
    path: '/questions/:id',
    name: 'AppTask',
    component: AppTask,
  },
  {
    path: '/final',
    name: 'AppFinalPage',
    component: AppFinalPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
