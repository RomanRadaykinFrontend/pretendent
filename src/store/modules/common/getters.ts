import { Getters } from 'vuex-smart-module'
import { CommonState } from './index'

export class CommonGetters extends Getters<CommonState> {

  get commonState(){
    return this.state
  }

  get user() {
    return this.state.user
  }
  get answers() {
    return this.state.answers
  }

  get currentAnswer(){
    return this.state.currentAnswer
  }

  get doneTaskList(){
    return this.state.doneTaskList
  }

  get isModalWindowShowed(){
    return this.state.isModalWindowShowed
  }

  get isIncorrectFormData(){
    return this.state.isIncorrectFormData
  }

  get isAuthorized(){
    return this.state.isAuthorized
  }

  get timeRemain(){
    return this.state.timeRemain
  }

  get timer(){
    return this.state.timer
  }

  get errorLogin(){
    return this.state.errorLogin
  }

  get isShowFetchedError(){
    return this.state.isShowFetchedError
  }
}
