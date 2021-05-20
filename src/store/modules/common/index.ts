import { Module } from 'vuex-smart-module'
import { CommonMutations } from './mutations'
import { CommonActions } from './actions'
import { CommonGetters } from './getters'

export class CommonState {
  public page = 1
}

export const commonModule = new Module({
  namespaced: true,
  state: CommonState,
  getters: CommonGetters,
  mutations: CommonMutations,
  actions: CommonActions,
})
