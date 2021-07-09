import { Getters } from 'vuex-smart-module'
import { AdminState } from './index'


export class AdminGetters extends Getters<AdminState> {
  get results(){
    return this.state.results
  }

  get resultsCount(){
    return this.state.resultsCount
  }

  get userID(){
    return this.state.userID
  }

  get typeTasks(){
    return this.state.typeTasks
  }

  get questions(){
    return this.state.questions
  }

  get sortQuestions(){
    return this.state.sortQuestions
  }

  get totalCount(){
    return this.state.totalCount
  }

  get page(){
    return this.state.page
  }

  get isAllDataFetched(){
    return this.state.isAllDataFetched
  }

  get rightAnswers(){
    return this.state.rightAnswers
  }

}
