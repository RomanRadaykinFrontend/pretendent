import {
  SET_DEFAULT_DATA,
  SET_DOMAINS,
  SET_AFTER_LOGIN,
  SET_USER,
  SET_STATUS,
  SET_MESSAGE,
  SET_ALLOWED_PERMITS,
} from './../mutation.types'
import { AuthState } from './../../../types/store.types'
import { RemoteDataStatus } from '../../../types/common.types'
import { MutationTree } from 'vuex'
import { Domain, UserFull } from '../../../services/api'
import { getDefaultState } from './index'
import { decodeJSON, encodeJSON, getFromStorage, setToStorage, StoreKeys } from '../../../services/helpers'

export const mutations: MutationTree<AuthState> = {
  [SET_USER]: ( state, user: UserFull ) => {
    state.user = user
  },

  [SET_AFTER_LOGIN]: ( state, value: boolean ) => {
    state.afterLogin = value
  },

  [SET_DOMAINS]: ( state, domains: Array<Domain> ) => {
    state.domains = domains
  },

  [SET_DEFAULT_DATA]: ( state: AuthState ) => {
    Object.assign( state, getDefaultState() )
  },

  [SET_ALLOWED_PERMITS]: ( state: AuthState, permits: Array<string> ) => {
    if ( permits ) {
      state.allowedPermits =  [ ...permits ]
      setToStorage( StoreKeys.PERMITS, encodeJSON( permits ) )
      return
    }
    const storedPermits = decodeJSON( getFromStorage( StoreKeys.PERMITS ) )
    state.allowedPermits = storedPermits ?? []
  },

  [SET_STATUS]: ( state: AuthState, status: RemoteDataStatus ) => {
    state.status = status
  },

  [SET_MESSAGE]: ( state: AuthState, msg: string ) => {
    state.message = msg
  },
}
