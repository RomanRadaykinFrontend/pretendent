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
