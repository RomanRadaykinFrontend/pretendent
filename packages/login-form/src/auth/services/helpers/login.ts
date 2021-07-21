import { ADFSData, LoginData } from '../../types/login'
import { TokenStatus } from './../../types/common.types'
import { ADFS, authApi, AuthRefreshRequest, AuthUserRequest, LDAP, User } from '../../services/api'
import { getAccessToken, getRefreshToken, saveTokensData, setToStorage } from '../../services/helpers'
import store from './../../store/'
import { FETCH_USER } from './../../store/modules/action.types'

export const checkAPI =( api: any ) => {
  if ( !api ) {
    const token = getAccessToken()
    if ( token ) {
      window.EVENT_BUS.$emit( TokenStatus.SUCCESS, token )
    }
  }
}

export const sortItems = ( items: Array<any>, key: string ): Array<any> => {
  if ( !items || !key ) {
    return items
  }
  return items.sort( ( a, b ) => ( a[key] ?? '' ) > ( b[key] ?? '' ) ? 1 : -1 )
}

export const checkADFSAuth = () => {
  const urlParams = getURLParams( window.location.href )
  const params: ADFSData = {
    state: urlParams.state,
    token: urlParams.token,
  }
  if ( params.state && params.token ) {
    setToStorage( 'token', params.token )
  }
}

export const encodeJSON = ( data: any ) => ( data instanceof Object )
  ? btoa( encodeURIComponent( JSON.stringify( data ) ) )
  : ''

export const decodeJSON = ( data: string ) => data?.trim()
  ? JSON.parse( decodeURIComponent( atob( data ) ) )
  : ''

export const getURLParams = ( URL: string ) => {
  const result: any = URL.substring( URL.indexOf( '?' ) + 1 )
    .split( '&' )
    .reduce(
      ( memo, param ) => ({
        ...memo,
        [param.split( '=' )[0]]: param.split( '=' )[1],
      }), {},
    )
  return result
}

export const updateTokens = async (): Promise<any> => {
  try {
    const payload: AuthRefreshRequest = {
      inlineObject: {
        refreshToken: getRefreshToken(),
      },
    }
    const response = await authApi.authRefresh( payload )
    if ( response.accessToken && response.refreshToken ) {
      saveTokensData( response )
      window.EVENT_BUS.$emit( TokenStatus.SUCCESS, response.accessToken )
    } else {
      window.EVENT_BUS.$emit( TokenStatus.ERROR, 'Tokens not received when updating tokens' )
      return
    }
  } catch ( e ) {
    window.EVENT_BUS.$emit( TokenStatus.ERROR, 'Tokens update error' )
  }
}

export const saveUserDataToStorage = ( user: User ) => {
  const userData = encodeJSON({
    login: user?.login ?? '',
    domain: user?.domain ?? '',
    displayName: user?.displayName ?? '',
  })
  setToStorage( 'user', userData )
}

export const getAuthPayload = ( data: LoginData ): AuthUserRequest => {
  let authData: LDAP | ADFS = null
  if ( data?.isADFS ) {
    authData = { token: data.token, state: data.state }
  } else {
    authData = { login: data.login, password: data.password }
  }
  return {
    domain: data.domain,
    domainType: authData,
  }
}

export enum AuthError {
  ACCESS_DENIED = 'Недостаточно прав доступа',
  AUTH_FAILED = 'Не удалось авторизоваться',
  USER_DATA_FAILED = 'Не удалось получить данные пользователя',
  DOMAIN_DATA_FAILED = 'Не удалось получить список доменов'
}

export const hasUserData = async (): Promise<boolean> => {
  try {
    if ( !store.getters['authStore/user']) {
      await store.dispatch( 'authStore/'+FETCH_USER )
    }
    return store.getters['authStore/user']
  } catch ( e ) {
    return false
  }
}
