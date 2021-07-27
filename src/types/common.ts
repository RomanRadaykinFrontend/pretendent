import { Questions, UserResult } from '@/services/api'

export interface QuestionData {
  [id: number]: {
    [textQuestion: string]: Array<string>
  }
}

export type InputName = 'name' | 'lastName' | 'email' | 'telegram'

export interface CurrentAnswer {
  pickedValue: string,
  question: number,
}

export interface DoneTaskList {
  taskNumber: number,
  value: string,
}

export type PropAnswer = { question: number, answer: number } | undefined

export interface DataExcel{
  id: number
  name: string
  lastName: string
  percent: number
  email: string
  telegram: string
  date: string
}

export interface UserResultWithID extends UserResult{
  id: number
}

export interface QuestionsWithOrderNum extends Questions{
  orderNum: number
}
