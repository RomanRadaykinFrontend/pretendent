import { Module } from 'vuex-smart-module'
import { User } from 'src/services/api/models/User'
import { Answers, Questions } from '@/services/api'
import { DoneTaskList } from '@/types/common'
import { TestingGetters } from '@/store/modules/testing/getters'
import { TestingMutations } from '@/store/modules/testing/mutations'
import { TestingActions } from '@/store/modules/testing/actions'

export class TestingState {
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

  public isAccountExist = false

  public timer = 0

  public errorLogin = false

  public isShowFetchedError = false

  public currentQuestion = {} as Questions | {}

  public questionTotalCount = 0

}

export const testingModule = new Module({
  namespaced: true,
  state: TestingState,
  getters: TestingGetters,
  mutations: TestingMutations,
  actions: TestingActions,
})
