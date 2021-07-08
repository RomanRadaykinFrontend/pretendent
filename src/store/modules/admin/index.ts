import { Module } from 'vuex-smart-module'
import { AdminGetters } from '@/store/modules/admin/getters'
import { AdminMutations } from '@/store/modules/admin/mutations'
import { AdminActions } from '@/store/modules/admin/actions'
import { Questions, Results } from '@/services/api'


export class AdminState {
  public results = [] as Array<Results>
  public resultsCount = '10'
  public totalCount = 0
  public userID = ''
  public typeTasks = 'Все вопросы'
  public questions = [] as Array<Questions>
  public page = 1
  public sortQuestions = [] as Array<Questions>
}

export const adminModule = new Module({
  namespaced: true,
  state: AdminState,
  getters: AdminGetters,
  mutations: AdminMutations,
  actions: AdminActions,
})
