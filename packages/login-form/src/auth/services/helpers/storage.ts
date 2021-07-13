import { InlineResponse200 as TokensResponse } from '../api'
import { TOKEN_REFRESH_INTERVAL } from '../helpers'

const STORAGE = window.localStorage

export enum StoreKeys {
  USER = 'user',
  UPDATE = 'update',
  PERMITS = 'permits',
  A_TOKEN = 'access_token',
  R_TOKEN = 'refresh_token',
  ADFS_TOKEN = 'token',
  ADFS_STATE = 'ADFS_state',
  ADFS_DOMAIN = 'ADFS_domain',
}

export const keyListToClear = [
  StoreKeys.USER,
  StoreKeys.UPDATE,
  StoreKeys.R_TOKEN,
  StoreKeys.A_TOKEN,
  StoreKeys.ADFS_STATE,
  StoreKeys.ADFS_DOMAIN,
]

export const setToStorage = ( key: string, value = '' ) => {
  STORAGE.setItem( key, value )
}

export const getFromStorage = ( key: string ): string => STORAGE.getItem( key )

export const removeFromStorage = ( key: string ) => {
  STORAGE.removeItem( key )
}

export const clearStorage = ( keys: Array<string> = [
  StoreKeys.A_TOKEN, StoreKeys.R_TOKEN, StoreKeys.UPDATE, StoreKeys.USER,
]) => {
  keys.forEach( key => {
    removeFromStorage( key )
  })
}

export const isStorageKeysExist = ( keys: Array<string> = [
  StoreKeys.A_TOKEN, StoreKeys.R_TOKEN, StoreKeys.UPDATE,
]): boolean => {
  for ( const key of keys ) {
    if ( getFromStorage( key ) === null ) {
      return false
    }
  }
  return true
}

export const saveTokensData = ( data: TokensResponse ): void => {
  setToStorage( StoreKeys.A_TOKEN, data.accessToken )
  setToStorage( StoreKeys.R_TOKEN, data.refreshToken )
  setToStorage( StoreKeys.UPDATE, String( ( Date.now() + TOKEN_REFRESH_INTERVAL ) ) )
}
