import { commonModule } from '@/store'

export const sendAnswers = async ( arrayOfValues: Array<string> ) => {
  const picked = commonModule.getters.currentAnswer.pickedValue

  const answer = arrayOfValues.indexOf( picked ) + 1
  if( answer === 0 ){
    return
  }
  const question = commonModule.getters.currentAnswer.question

  commonModule.mutations.setAnswers({ question, answer })

  const answers = commonModule.getters.answers

  await commonModule.actions.fetchAnswers({
    answers,
  })
}
