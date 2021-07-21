/* tslint:disable */
/* eslint-disable */

import {
  KvApi,
  AuthApi,
  AdfsApi,
  UsersApi,
  DomainsApi,
  Configuration,
} from './openapi'
import { getAccessToken } from '../helpers/api'
import { TokenStatus } from './../../types/common.types'
import Vue from 'vue'

const AUTH_API_URL = window.AUTH_API_URL
const configuration = new Configuration({ basePath: AUTH_API_URL })

export const initEventBusActions = ( eventBus: Vue ) => {
  eventBus.$on( TokenStatus.SUCCESS, ( accessToken: string ) => initAPIs( accessToken ) )
  eventBus.$on( TokenStatus.RESET, () => initAPIs('') )
  eventBus.$on( TokenStatus.ERROR, ( message: string ) => {
    initAPIs('')
    console.error( message )
  })
  firstInitAPI()
}

function initAPIs( accessToken: string ) {
  const configuration = new Configuration({
    basePath: AUTH_API_URL,
    accessToken,
  })
  kvApi =  new KvApi( configuration )
  authApi =  new AuthApi( configuration )
  adfsApi = new AdfsApi( configuration )
  usersApi = new UsersApi( configuration )
  domainsApi = new DomainsApi( configuration )
}
function firstInitAPI() {
  const accessToken = getAccessToken()
  if ( accessToken ) {
    initAPIs( accessToken )
  }
}
firstInitAPI()

export let kvApi: KvApi = null
export let authApi: AuthApi = null
export let adfsApi: AdfsApi = null
export let usersApi: UsersApi = null
export let domainsApi = new DomainsApi( configuration )
export * from './openapi'
