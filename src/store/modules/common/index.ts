import { Module } from 'vuex-smart-module'
import { CommonMutations } from './mutations'
import { CommonActions } from './actions'
import { CommonGetters } from './getters'
import { User } from 'src/services/api/models/User'
import { Answers } from '@/services/api'
import { DoneTaskList } from '@/types/common'

export class CommonState {
  public user = {
    name: '',
    lastName: '',
    email: '',
    telegram: '',
  } as User

  public answers = {
    answers: [],
    userGUID: '',
  } as Answers

  public currentAnswer = {
    pickedValue: '',
    question: 0,
  }

  public doneTaskList = [] as Array<DoneTaskList>

  public isModalWindowShowed = false
  public isTestingFinished = false

  public isIncorrectFormData = false

  public isAuthorized = true

  public timeRemain = 5400

  public isAccountExist = false
}

export const commonModule = new Module({
  namespaced: true,
  state: CommonState,
  getters: CommonGetters,
  mutations: CommonMutations,
  actions: CommonActions,
})
