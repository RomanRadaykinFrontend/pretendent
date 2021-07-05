import { Module } from 'vuex-smart-module'
import { AdminGetters } from '@/store/modules/admin/getters'
import { AdminMutations } from '@/store/modules/admin/mutations'
import { AdminActions } from '@/store/modules/admin/actions'


export class AdminState {

}

export const adminModule = new Module({
  namespaced: true,
  state: AdminState,
  getters: AdminGetters,
  mutations: AdminMutations,
  actions: AdminActions,
})
