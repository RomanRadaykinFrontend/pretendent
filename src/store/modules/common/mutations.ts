import { Mutations } from 'vuex-smart-module'
import { CommonState } from './index'

export class CommonMutations extends Mutations<CommonState> {
  public setPage() {
    this.state.page += 1
  }
}
