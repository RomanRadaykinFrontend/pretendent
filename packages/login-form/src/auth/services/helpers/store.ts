import { getFromStorage, decodeJSON } from '.'
import { UserShortData } from '../../types/common.types'
import { UsersGetRequest } from '../api'
import { StoreKeys } from './storage'

export const getLoggedUserData = (): UsersGetRequest => {
  const user = getUserFromStore()
  return !user ? null : {
    domain: user.domain,
    login: user.login,
  }
}

export const getUserFromStore = (): UserShortData => {
  const userData = getFromStorage( StoreKeys.USER )
  return userData ? decodeJSON( userData ) : null
}

export const checkAccessGranted = (
  allowedPermits: Array<string>,
  permits: Array<string>,
): boolean => {
  if ( allowedPermits.length && permits.length ) {
    return allowedPermits?.some( p => permits.includes( p ) ) ?? false
  } else {
    return false
  }
}
