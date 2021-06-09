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
    } else {
      this.state.doneTaskList = [ ...this.state.doneTaskList, { taskNumber, value }]
    }
  }

  public setIsModalWindowShowed( value: boolean ){
    this.state.isModalWindowShowed = value
  }
  public setIsTestingFinished( value: boolean ){
    this.state.isTestingFinished = value
  }

  public setIsIncorrectFormData( value: boolean ){
    this.state.isIncorrectFormData = value
  }

  public setIsAuthorized( value: boolean ){
    this.state.isAuthorized = value
  }

  public setTimeRemain(){
    const timer = setInterval( () => {
      this.state.timeRemain -= 1
      if( this.state.timeRemain === 0 ){
        clearInterval( timer )
      }
    }, 1000 )
  }


  public setIsAccountExist( value: boolean ){
    this.state.isAccountExist = value
  }
}
