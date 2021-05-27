import { Getters } from 'vuex-smart-module'
import { CommonState } from './index'

export class CommonGetters extends Getters<CommonState> {
  get user() {
    return this.state.user
  }
  get answers() {
    return this.state.answers
  }
}
