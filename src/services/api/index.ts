import { AnswerApi, CorrectApi, QuestionsApi, ResultsApi, UserApi } from '@/services/api/apis'

export * from './runtime'
export * from './apis'
export * from './models'


export const USER_API = new UserApi()
export const ANSWER_API = new AnswerApi()
export const RESULTS_API = new ResultsApi()
export const QUESTIONS_API = new QuestionsApi()
export const CORRECT_API = new CorrectApi()
