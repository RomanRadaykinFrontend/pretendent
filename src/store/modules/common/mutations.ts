import { Mutations } from 'vuex-smart-module'
import { CommonState } from './index'
import { InputName } from '@/types/common'
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
    this.state.answers.answers = [
      ...this.state.answers.answers, data,
    ]
  }
}
