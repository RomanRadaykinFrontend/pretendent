import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AppLoginForm from '../views/AppLoginForm.vue'

Vue.use( VueRouter )

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'AppLoginForm',
    component: AppLoginForm,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
