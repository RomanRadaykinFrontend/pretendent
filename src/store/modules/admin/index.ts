import { Module } from 'vuex-smart-module'
import { AdminGetters } from '@/store/modules/admin/getters'
import { AdminMutations } from '@/store/modules/admin/mutations'
import { AdminActions } from '@/store/modules/admin/actions'
import { CorrectAnswer, Questions, UserResult } from '@/services/api'


export class AdminState {
  public results = [] as Array<UserResult>
  public resultsCount = '10'
  public totalCount = 0
  public userID = ''
  public typeTasks = 'Все вопросы'
  public questions = [] as Array<Questions> | undefined
  public page = 1
  public sortQuestions = [] as Array<Questions>
  public isAllDataFetched = false
  public rightAnswers = [] as Array<CorrectAnswer>
}

export const adminModule = new Module({
  namespaced: true,
  state: AdminState,
  getters: AdminGetters,
  mutations: AdminMutations,
  actions: AdminActions,
})
