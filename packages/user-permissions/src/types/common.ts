export enum RemoteDataStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  ERROR_NO_BG = 'ERROR_NO_BG',
  SUCCESS = 'SUCCESS',
  UNLOAD_ERROR = 'UNLOAD_ERROR',
  UNLOAD_SUCCESS = 'UNLOAD_SUCCESS',
}
export interface DropDownItem {
  icon?: string
  name?: string
  value?: string
  disabled?: boolean
}

export interface InfoMessage {
  type: InfoMessageTypes;
  text: string;
}

export type InfoMessageTypes = 'info' | 'success' | 'error' | 'warn'

export interface SortType {
  field: string,
  direction: 'desc' | 'asc'
}
