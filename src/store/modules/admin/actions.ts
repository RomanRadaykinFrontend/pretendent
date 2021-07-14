import { AdminState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { AdminGetters } from '@/store/modules/admin/getters'
import { AdminMutations } from '@/store/modules/admin/mutations'
import { QUESTIONS_API, RESULTS_API, UserResult } from '@/services/api'



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

  public async getResults() {
    try {
      this.commit( 'setIsAllDataFetched', true )

      const totalCount = ( await RESULTS_API.results({ offset: 0, limit: 1 }) ).count
      this.commit( 'setTotalCount', totalCount )

      const result = await  RESULTS_API.results({ offset: 0, limit: totalCount })
      const users = result.users.map( ( u: UserResult, idx: number ) => ({ ...u, id: idx + 1 }) )

      this.commit( 'setResults', users )
    } catch ( e ) {
      return e.message
    }
    this.commit( 'setIsAllDataFetched', false )
  }

  // public async getTotalCount( resReq = { offset: 0, limit: 1 }) {
  //   try {
  //     const result = await RESULTS_API.results( resReq )
  //     this.commit( 'setTotalCount', result.count )
  //   } catch ( e ) {
  //     return e.message
  //   }
  // }

  public async getRightAnswer(){
    try{
      const result = await QUESTIONS_API.correct()
      this.commit( 'setRightAnswers', result.correctAnswers )
    }catch ( e ){
      return e.message
    }
  }

}
