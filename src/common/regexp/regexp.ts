const emailPart1 =  '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9]'
const emailPart2 = '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+[a-zA-Z0-9]'
const emailPart3 = '(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'

export const regExpEmail = new RegExp( `${emailPart1}${emailPart2}${emailPart3}` )
// private telegramErrorIsShowed = ( this.value !== '' && this.name === 'telegram'
//   && !this.isInvalidTelegramField && this.isFocused )
//   || ( this.name === 'telegram' && this.isIncorrectFormData && !this.isInvalidTelegramField )
//
// private emailErrorIsShowed = ( this.value!== '' && this.name === 'email'
//   && !this.isInvalidEmailField && this.isFocused ) ||
//   ( this.name === 'email' && !this.isInvalidEmailField && this.isIncorrectFormData )
//
// private nameErrorIsShowed = ( this.isEmptyField && this.isFocused ) ||
//   ( ( this.name === 'name' || this.name === 'lastName' ) && this.isIncorrectFormData && this.value === '' )
