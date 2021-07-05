import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { testingModule as tm } from './modules/testing'

Vue.use( Vuex )
export const root = new Module({
  modules: {
    testingModule : tm,
  },
})
export const store = createStore( root )
export const testingModule  = root.context( store ).modules.testingModule
