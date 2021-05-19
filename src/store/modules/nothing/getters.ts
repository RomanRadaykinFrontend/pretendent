import { Getters } from 'vuex-smart-module'
import { NothingState } from './index'

export class NothingGetters extends Getters<NothingState> {
  get Nothing() {
    return this.state.Nothing
  }
}
