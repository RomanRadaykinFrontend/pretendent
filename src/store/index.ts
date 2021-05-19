import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { commonModule } from './modules/common'

Vue.use( Vuex )

export const root = new Module({
  modules: {
    commonModule,
  },
})

export const store = createStore( root )
