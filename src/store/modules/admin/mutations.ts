import { Mutations } from 'vuex-smart-module'
import { AdminState } from '@/store/modules/admin/index'
import { Question } from '@/common/questions'
import { UserRes } from '@/services/api'



export class AdminMutations extends Mutations<AdminState> {
  public setResults( value: Array<UserRes> ){
    this.state.results = value
  }

  public setResultsCount( value: string ){
    this.state.resultsCount = value
  }

  public setTotalCount( value: number ){
    this.state.totalCount = value
  }

  public setUserID( value: string ){
    this.state.userID = value
  }

  public setTypeTasks( value: string ){
    this.state.typeTasks = value
  }

  public setQuestions( value: Array<Question> ){
    this.state.questions = value
  }

  public setPage( value: number ){
    this.state.page = value
  }

  public setSortQuestions( value: Array<Question> ){
    this.state.sortQuestions = value
  }
}
