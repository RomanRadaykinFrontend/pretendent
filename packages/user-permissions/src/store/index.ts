import Vue from 'vue'
import Vuex from 'vuex'
import upCommon from './modules/common'
import upAccounts from './modules/accounts.module'
import upGroups from './modules/groups.module'
import { authStore } from 'login-form'

Vue.use( Vuex );

export default new Vuex.Store({
  modules: {
    upCommon,
    upGroups,
    upAccounts,
    authStore,
  },
})
