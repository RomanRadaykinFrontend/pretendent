import { CommonState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { CommonMutations } from './mutations'
import { CommonGetters } from './getters'
import { SET_USERGUID } from '@/store/mutation.types'
import { UsersCreateRequest, USER_API, AddNewAnswersRequest, ANSWER_API } from '@/services/api'


export class CommonActions extends Actions<
CommonState,
CommonGetters,
CommonMutations,
CommonActions> {
  public async fetchUser( data: UsersCreateRequest ) {
    try {
      const result = await USER_API.usersCreate( data )
      this.commit( SET_USERGUID, result.userGUID )
      this.commit( 'setIsErrorLogin', false )
      this.commit( 'setIsShowFetchedError', false )
      return result
    } catch ( error ){
      this.commit( 'setIsErrorLogin', true )
      return error.message
    }
  }
  public async fetchAnswers( data: AddNewAnswersRequest ) {
    try {
      await ANSWER_API.addNewAnswers( data )
    } catch ( error ) {
      return  error.message
    }
  }

}
