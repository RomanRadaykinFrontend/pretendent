import { testingModule } from '@/store'
export const sendAnswers = async arrayOfValues => {
  const picked = testingModule.getters.currentAnswer.pickedValue
  const answer = arrayOfValues.indexOf( picked ) + 1
  if ( answer === 0 ) {
    return
  }
  const question = testingModule.getters.currentAnswer.question
  testingModule.mutations.setAnswers({ question, answer })
  const answers = testingModule.getters.answers
  await testingModule.actions.fetchAnswers({
    answers,
  })
}
export const getDate = date => {
  if ( date ) {
    const formatDate = new Date( date )
    const addZero = numb => {
      if ( numb.toString().length === 1 ) {
        return '0' + numb.toString()
      }
      return numb.toString()
    }
    const day = formatDate.getDate()
    const month = formatDate.getMonth() + 1
    const year = formatDate.getFullYear()
    return `${addZero( day )}.${addZero( month )}.${addZero( year )}`
  }
}
export const sortItems = ( a, b, direction ) => direction ?
  a > b ? 1 : -1
  :
  a < b ? 1 : -1
// # sourceMappingURL=functions.js.map
