import { RequestOpts } from './../api'
import { getFromStorage, StoreKeys } from '../helpers/storage'

export const getAccessToken = (): string => getFromStorage( StoreKeys.A_TOKEN ) ?? null

export const getRefreshToken = (): string => getFromStorage( StoreKeys.R_TOKEN ) ?? null

export const addAccessTokenToParams = ( request: RequestOpts, accessToken: string ) => {
  if ( !accessToken ) {
    return
  }
  if ( !request?.query ) {
    request.query = {}
  }
  request.query[ 'access_token'] = accessToken
}
