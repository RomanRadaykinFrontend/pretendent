export type FormDataItem = [ 'name' | 'lastName' | 'email' | 'telegram', string]

export interface QuestionData {
  [id: number]: {
    [textQuestion: string]: Array<string>
  }
}

export type InputName = 'name' | 'lastName' | 'email' | 'telegram'
