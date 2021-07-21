import { RemoteDataStatus } from './../types/common.types'
import { Domain, UserFull } from '../services/api'


export interface RootState {
  language?: string
  id?: string
}

// TODO: Reorganizing AuthState structure
export interface AuthState {
  user: UserFull
  status: RemoteDataStatus
  message: string
  domains: Array<Domain>
  afterLogin: boolean
  allowedPermits: Array<string>
}
