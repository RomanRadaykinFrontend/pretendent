import { Mutations } from 'vuex-smart-module'
import { AdminState } from '@/store/modules/admin/index'
import { CorrectAnswer, Questions } from '@/services/api'
import { UserResultWithID } from '@/types/common'



export class AdminMutations extends Mutations<AdminState> {
  public setResults( value: Array<UserResultWithID> ){
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

  public setQuestions( value: Array<Questions> | undefined ){
    this.state.questions = value
  }

  public setPage( value: string | number ){
    this.state.page = value
  }

  public setSortQuestions( value: Array<Questions> ){
    this.state.sortQuestions = value
  }

  public setIsAllDataFetched( value: boolean ){
    this.state.isAllDataFetched = value
  }

  public setRightAnswers( value: Array<CorrectAnswer> ){
    this.state.rightAnswers = value
  }
}
