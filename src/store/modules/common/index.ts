import { Module } from 'vuex-smart-module'
import { CommonMutations } from './mutations'
import { CommonActions } from './actions'
import { CommonGetters } from './getters'
import { User } from 'api/models/User'
import { Answers } from '../../../../api'

export class CommonState {
  public user = {
  } as User

  public answers = {
    answers: [],
    userGUID: '',
  } as Answers
}

export const commonModule = new Module({
  namespaced: true,
  state: CommonState,
  getters: CommonGetters,
  mutations: CommonMutations,
  actions: CommonActions,
})
