import { CommonState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { CommonMutations } from './mutations'
import { CommonGetters } from './getters'


export class CommonActions extends Actions<
CommonState,
CommonGetters,
CommonMutations,
CommonActions> {
  public async fetchNothing() {
    try {
      const res = await fetch( '' )
      const page = await res.text()
      this.mutations.setPage( page )
    } catch ( e ) {
      console.error( e )
    }
  }
}
