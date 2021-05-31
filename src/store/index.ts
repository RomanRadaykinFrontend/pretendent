import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { commonModule as cm } from './modules/common'

Vue.use( Vuex )
export const root = new Module({
  modules: {
    commonModule : cm,
  },
})
export const store = createStore( root )
export const commonModule  = root.context( store ).modules.commonModule
