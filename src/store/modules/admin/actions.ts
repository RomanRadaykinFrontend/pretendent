import { AdminState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { AdminGetters } from '@/store/modules/admin/getters'
import { AdminMutations } from '@/store/modules/admin/mutations'
import { QUESTIONS_API, RESULTS_API, ResultsRequest } from '@/services/api'



export class AdminActions extends Actions<
AdminState,
AdminGetters,
AdminMutations,
AdminActions> {

  public async getAllQuestions() {
    try{
      const result = await QUESTIONS_API.questions()
      this.commit( 'setQuestions', result.questions )
    } catch( e ){
      return e.message
    }
  }

  public async getResults( resReq: ResultsRequest ) {
    try {
      this.commit( 'setIsAllDataFetched', true )
      const result = await RESULTS_API.results( resReq )
      const count = resReq.offset ?? 0
      const users = result.users.map( ( u, idx ) => ({ ...u, id: count + idx + 1 }) )
      this.commit( 'setResults', users )
      this.commit( 'setTotalCount', result.count )
    } catch ( e ) {
      return e.message
    }
    this.commit( 'setIsAllDataFetched', false )
  }

  public async getRightAnswer(){
    try{
      const result = await QUESTIONS_API.correct()
      this.commit( 'setRightAnswers', result.correctAnswers )
    }catch ( e ){
      return e.message
    }
  }

}
