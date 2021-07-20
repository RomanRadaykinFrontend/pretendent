import { Module } from 'vuex-smart-module'
import { User } from 'src/services/api/models/User'
import { Answers, Questions } from '@/services/api'
import { DoneTaskList } from '@/types/common'
import { TestingGetters } from '@/store/modules/testing/getters'
import { TestingMutations } from '@/store/modules/testing/mutations'
import { TestingActions } from '@/store/modules/testing/actions'

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

  public isIncorrectFormData = false

  public isAuthorized = false

  public timeRemain = 0

  public timeStart = 0

  public timer = 0

  public errorLogin = ''

  public isShowFetchedError = false

  public questionTotalCount = 0

  public allQuestions = [] as Array<Questions> | []

}

export const testingModule = new Module({
  namespaced: true,
  state: TestingState,
  getters: TestingGetters,
  mutations: TestingMutations,
  actions: TestingActions,
})
