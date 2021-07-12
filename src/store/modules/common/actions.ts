import { CommonState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { CommonMutations } from './mutations'
import { CommonGetters } from './getters'
import { SET_USERGUID } from '@/store/mutation.types'
import { UsersCreateRequest, USER_API, AddNewAnswersRequest, ANSWER_API, QUESTIONS_API } from '@/services/api'


export class CommonActions extends Actions<
CommonState,
CommonGetters,
CommonMutations,
CommonActions> {
  public async fetchUser( data: UsersCreateRequest ) {
    try {
      const result = await USER_API.usersCreate( data )
      this.commit( SET_USERGUID, result.userGUID )
      this.commit( 'setIsErrorLogin', '' )
      this.commit( 'setIsShowFetchedError', false )
      return result
    } catch ( error ){
      if( error.status === 409 ){
        this.commit( 'setIsErrorLogin', 'Данный email уже зарегистрирован, введите другой email' )
      } else {
        this.commit( 'setIsErrorLogin', 'Что-то пошло не-так, обратитесь к администратору' )
      }
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

  public async getAllQuestions(){
    try{
      const result = await QUESTIONS_API.questions()
      const allQuestions = result.questions ?? []
      this.commit( 'setAllQuestions', allQuestions )
      this.commit( 'setQuestionTotalCount', result.questions ? result.questions.length : 0 )
      return allQuestions
    } catch( error ){
      return error
    }
  }

}
