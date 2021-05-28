import { AnswerApi, UserApi } from './apis'

export * from './runtime'
export * from './apis'
export * from './models'


export const USER_API = new UserApi()
export const ANSWER_API = new AnswerApi()
