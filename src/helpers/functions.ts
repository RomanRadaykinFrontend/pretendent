import { testingModule } from '@/store'

export const sendAnswers = async ( arrayOfValues: Array<string> ) => {
  const picked = testingModule.getters.currentAnswer.pickedValue

  const answer = arrayOfValues.indexOf( picked ) + 1
  if( answer === 0 ){
    return
  }
  const question = testingModule.getters.currentAnswer.question

  testingModule.mutations.setAnswers({ question, answer })

  const answers = testingModule.getters.answers

  await testingModule.actions.fetchAnswers({
    answers,
  })
}
