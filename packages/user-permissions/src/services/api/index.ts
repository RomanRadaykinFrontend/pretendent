import {
  AuthApi,
  AdfsApi,
  GroupsApi,
  UsersApi,
  DomainsApi,
  KvApi,
  Configuration,
} from './../api/openapi'
import { getAccessToken, TokenStatus } from 'login-form'

const AUTH_API_URL = window.AUTH_API_URL

export const initEventBusActions = ( eventBus: Vue ) => {
  eventBus.$on( TokenStatus.SUCCESS, ( accessToken: string ) => initAPIs( accessToken ) )
  eventBus.$on( TokenStatus.RESET, () => initAPIs( '' ) )
  eventBus.$on( TokenStatus.ERROR, ( message: string ) => {
    initAPIs( '' )
    console.error( message )
  },
  )
  checkTokenExist()
}

const initAPIs = ( accessToken: string ) => {
  const authConfiguration = new Configuration({
    basePath: AUTH_API_URL,
    fetchApi: window.fetch.bind( window ),
    accessToken,
  })
  authApi = new AuthApi( authConfiguration )
  adfsApi = new AdfsApi( authConfiguration )
  groupsApi = new GroupsApi( authConfiguration )
  usersApi = new UsersApi( authConfiguration )
  domainsApi = new DomainsApi( authConfiguration )
  kvApi = new KvApi( authConfiguration )
}

const checkTokenExist = () => {
  const accessToken = getAccessToken()
  if ( accessToken ) {
    initAPIs( accessToken )
  }
}
checkTokenExist()

export let authApi: AuthApi = null
export let adfsApi: AdfsApi = null
export let groupsApi: GroupsApi = null
export let usersApi: UsersApi = null
export let domainsApi: DomainsApi = null
export let kvApi: KvApi = null
export * from './../api/openapi'
