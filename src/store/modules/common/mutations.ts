import { Mutations } from 'vuex-smart-module'
import { CommonState } from './index'
import { CurrentAnswer, DoneTaskList, InputName } from '@/types/common'
import { Answer } from 'src/services/api'

export class CommonMutations extends Mutations<CommonState> {
  public setUser( arrData: [InputName, string]) {
    const [ name, value ] = arrData
    this.state.user[name] = value
  }

  public setUserGUID( userGUID: string | undefined = '' ) {
    this.state.answers.userGUID = userGUID
  }

  public setAnswers( data: Answer ){
    const { question, answer } = data
    const needElemIndex = this.state.answers.answers.findIndex( item => {
      if( item.question === question ){
        return true
      }
    })
    if( needElemIndex !== -1 ){
      this.state.answers.answers[needElemIndex].answer = answer
    } else {
      this.state.answers.answers = [ ...this.state.answers.answers, { question, answer }]
    }
    localStorage.setItem( 'answers', JSON.stringify( this.state.answers.answers ) )
  }

  public setAnswersFromStorage( data: Array<Answer> ){
    this.state.answers.answers = [ ...data ]
  }

  public setCurrentAnswer( value: CurrentAnswer ){
    this.state.currentAnswer = value
  }

  public setDoneTaskList( object: DoneTaskList ){

    const { taskNumber, value } = object
    const needElemIndex = this.state.doneTaskList.findIndex( item => {
      if( item.taskNumber === taskNumber ){
        return true
      }
    })
    if( needElemIndex !== -1 ){
      this.state.doneTaskList[needElemIndex].value = value
      this.state.doneTaskList = [ ...this.state.doneTaskList ]
    } else {
      this.state.doneTaskList = [ ...this.state.doneTaskList, { taskNumber, value }]
    }
    localStorage.setItem( 'doneTaskList', JSON.stringify( this.state.doneTaskList ) )
  }

  public setDoneTaskListLocalStorage( data: Array<DoneTaskList> ){
    this.state.doneTaskList = [ ...data ]
  }

  public setIsModalWindowShowed( value: boolean ){
    this.state.isModalWindowShowed = value
  }

  public setIsIncorrectFormData( value: boolean ){
    this.state.isIncorrectFormData = value
  }

  public setIsAuthorized( value: boolean ){
    this.state.isAuthorized = value
    localStorage.isAuthorized = value
  }

  public setTimeRemain(){
    const timer = setInterval( () => {
      this.state.timeRemain -= 1
    }, 1000 )
  }
  public setTimeRemainLocalStorage( value: number ){
    this.state.timeRemain = value
  }

  public setIsAccountExist( value: boolean ){
    this.state.isAccountExist = value
  }

  public setTimeStart( value: number ){
    this.state.timeStart = value
  }

}
