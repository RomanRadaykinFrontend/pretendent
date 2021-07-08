import { AdminState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { AdminGetters } from '@/store/modules/admin/getters'
import { AdminMutations } from '@/store/modules/admin/mutations'
import { CORRECT_API, QUESTIONS_API, RESULTS_API, ResultsRequest } from '@/services/api'



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
      const result = await RESULTS_API.results( resReq )
      this.commit( 'setResults', result.users )
      this.commit( 'setTotalCount', result.count )
    } catch ( e ) {
      return e.message
    }
  }

  public async getRightAnswer(){
    try{
      const result = await CORRECT_API.correct()
      console.log( result )
    }catch ( e ){
      return e.message
    }
  }

}
