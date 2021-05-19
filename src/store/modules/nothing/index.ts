import { Module } from 'vuex-smart-module'
import { NothingMutations } from './mutations'
import { NothingActions } from './actions'
import { NothingGetters } from './getters'

export class NothingState {
  public Nothing = ''
}

export const nothingModule = new Module({
  namespaced: true,
  state: NothingState,
  getters: NothingGetters,
  mutations: NothingMutations,
  actions: NothingActions,
})
