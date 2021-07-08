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

export const getDate = ( date: Date ) => {
  const formatDate = new Date( date )

  const addZero = ( numb: number ) => {
    if( numb.toString().length === 1 ){
      return '0' + numb.toString()
    }
    return numb.toString()
  }

  const day = formatDate.getDate()
  const month = formatDate.getMonth() + 1
  const year = formatDate.getFullYear()

  return `${addZero( day )}.${addZero( month )}.${addZero( year )}`
}

export const sortItems = ( a: any, b: any, direction: boolean ) => direction ?
  a > b ? 1 : -1
  :
  a < b ? 1 : -1

export const unBaseUnStringData = ( data: string, isUtf8 = false ): object | undefined | string | number => {
  let uncodedDataString = ''
  try {
    uncodedDataString = atob( data )
    if( isUtf8 ) {
      uncodedDataString = decodeURIComponent( escape( uncodedDataString ) )
    }
  } catch ( err ) {
    console.log( err )
  }
  if ([ '{', '[' ].includes( uncodedDataString.charAt( 0 ) ) ) {
    const extractedData = JSON.parse( uncodedDataString )
    return extractedData
  }
  return Number.isNaN( +uncodedDataString ) ? uncodedDataString : +uncodedDataString
}