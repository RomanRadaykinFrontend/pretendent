import { Getters } from 'vuex-smart-module'
import { CommonState } from './index'

export class CommonGetters extends Getters<CommonState> {
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

  get isTestingFinished(){
    return this.state.isTestingFinished
  }
  get isModalWindowShowed(){
    return this.state.isModalWindowShowed
  }

  get isIncorrectFormData(){
    return this.state.isIncorrectFormData
  }
}
