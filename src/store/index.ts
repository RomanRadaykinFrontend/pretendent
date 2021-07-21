import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { testingModule as tm } from './modules/testing'
import { adminModule as am } from './modules/admin'

Vue.use( Vuex )
export const root = new Module({
  modules: {
    testingModule : tm,
    adminModule: am,
  },
})
export const store = createStore( root )
export const testingModule  = root.context( store ).modules.testingModule
export const adminModule  = root.context( store ).modules.adminModule
