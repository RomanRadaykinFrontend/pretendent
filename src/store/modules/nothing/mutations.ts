import { Mutations } from 'vuex-smart-module'
import { NothingState } from './index'

export class NothingMutations extends Mutations<NothingState> {
  public setNothing( Nothing: string ) {
    this.state.Nothing = Nothing
  }
}
