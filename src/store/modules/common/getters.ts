import { Getters } from 'vuex-smart-module'
import { CommonState } from './index'

export class CommonGetters extends Getters<CommonState> {
  get page() {
    return this.state.page
  }
}
