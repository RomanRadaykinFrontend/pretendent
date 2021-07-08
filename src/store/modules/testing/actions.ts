import { TestingState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { TestingMutations } from './mutations'
import { TestingGetters } from './getters'
import { SET_USERGUID } from '@/store/mutation.types'
import { UsersCreateRequest, USER_API, AddNewAnswersRequest, ANSWER_API, QUESTIONS_API } from '@/services/api'


export class TestingActions extends Actions<
TestingState,
TestingGetters,
TestingMutations,
TestingActions> {
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

  public async getQuestions( numOfQuest: number ){
    try{
      const result = await QUESTIONS_API.questions()
      const currentQuestion = result.questions ? result.questions[numOfQuest - 1] : {}
      this.commit( 'setCurrentQuestion', currentQuestion )
      this.commit( 'setQuestionTotalCount', result.questions ? result.questions.length : 0 )
      return currentQuestion
    } catch( error ){
      return error
    }
  }

}
