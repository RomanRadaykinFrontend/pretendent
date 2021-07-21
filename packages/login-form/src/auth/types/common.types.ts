import { User } from '../services/api'

export enum RemoteDataStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  ERROR_NO_BG = 'ERROR_NO_BG',
  SUCCESS = 'SUCCESS',
  UNLOAD_ERROR = 'UNLOAD_ERROR',
  UNLOAD_SUCCESS = 'UNLOAD_SUCCESS',
}

export enum TokenStatus {
  ERROR = 'ERROR',
  RESET = 'RESET',
  SUCCESS = 'SUCCESS',
}

export enum CommonBusEvents {
  CHANGE_DISPLAY_NAME = 'CHANGE_DISPLAY_NAME',
}

export type UserShortData = User
