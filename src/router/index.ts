import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RegistrationView from '@/views/Registration/RegistrationView.vue'
import TaskView from '@/views/Task/TaskView.vue'
import FinalPageView from '@/views/FinalPage/FinalPageView.vue'


Vue.use( VueRouter )

const routes: Array<RouteConfig> = [
  {
    path: '/',
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
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
