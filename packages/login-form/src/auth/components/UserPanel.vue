<template lang="pug">
.user-panel
  .user-icon( v-if="hasUserName" )
    include ./../common/assets/images/user
  .user-name {{ userName }}
  .logout-icon
    button(
      @click="logout()"
      title="Выход из системы"
    )
      include ./../common/assets/images/exit
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { MutationMethod, ActionMethod } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { initEventBusActions, authApi, UserFull, User } from './../services/api'
import { TokenStatus, CommonBusEvents, RemoteDataStatus } from './../types/common.types'
import {
  decodeJSON, updateTokens, getRefreshToken,
  clearStorage, getFromStorage, isStorageKeysExist,
  CHECK_NEED_REFRESH_INTERVAL, getAccessToken,
  keyListToClear, saveUserDataToStorage, StoreKeys, AuthError,
} from '../services/helpers'
import {
  FETCH_USER,
} from './../store/modules/action.types'
import {
  SET_STATUS,
  SET_MESSAGE,
  SET_AFTER_LOGIN,
  SET_ALLOWED_PERMITS,
} from './../store/modules/mutation.types'

const AS = namespace( 'authStore' )

@Component
export default class UserPanel extends Vue {
  @AS.Getter( 'user' ) private user!: UserFull
  @AS.Getter( 'isAccessGranted' ) private isAccessGranted!: boolean
  @AS.Getter( 'afterLogin' ) private afterLogin!: boolean
  @AS.Action( FETCH_USER ) private fetchUser!: ( x: UserFull ) => ActionMethod
  @AS.Mutation( SET_AFTER_LOGIN ) private setAfterLogin!: ( x: boolean ) => MutationMethod
  @AS.Mutation( SET_ALLOWED_PERMITS ) private setAllowedPermits!: MutationMethod
  @AS.Mutation( SET_STATUS ) private setStatus!: ( x: RemoteDataStatus ) => MutationMethod
  @AS.Mutation( SET_MESSAGE ) private setMessage!: ( x: string ) => MutationMethod

  private checkUpdateTimer = null

  get userName() {
    return this.user?.displayName ?? ''
  }

  get hasUserName(): boolean {
    return Boolean( this.userName?.trim() )
  }

  get isADFS(): boolean {
    const state = !!getFromStorage( StoreKeys.ADFS_STATE )
    const domain = !!getFromStorage( StoreKeys.ADFS_DOMAIN )
    return state && domain
  }

  // set user data on create component or page reload after page reload
  private async setUser(): Promise<any> {
    // if has no local storage key with user data - logout
    if ( !isStorageKeysExist() ) {
      console.error( 'Tokens not found when setting data from storage' )
      this.executeLogout()
      return
    }

    // decode user data from local storage key
    const userData: UserFull = decodeJSON( getFromStorage( StoreKeys.USER ) )
    await this.fetchUser({
      domain: userData.domain,
      login: userData.login,
    })
    if ( !this.isAccessGranted ) {
      this.setStatus( RemoteDataStatus.ERROR )
      this.setMessage( AuthError.ACCESS_DENIED )
      this.logout()
    } else {
      saveUserDataToStorage( this.user )
    }
  }

  private logoutADFS(): void {
    const x = {
      to: window.location.origin,
      token: getFromStorage( StoreKeys.R_TOKEN ),
      state: getFromStorage( StoreKeys.ADFS_STATE ),
      domain: getFromStorage( StoreKeys.ADFS_DOMAIN ),
    }
    const URL = window.AUTH_API_URL
    const redirectURL = `${URL}/auth/${x.domain}/logout?state=${x.state}&redirect=${x.to}&refresh_token=${x.token}`
    window.location.href = redirectURL
  }

  private async logoutDomain(): Promise<any> {
    await authApi.authInvalidate({
      inlineObject1: {
        refreshToken: getRefreshToken(),
      },
    })
    await this.$router.push({ name: 'login' })
  }

  private logout(): void {
    if ( this.isADFS ) {
      this.logoutADFS()
    } else {
      this.logoutDomain()
    }
    this.executeLogout()
    this.$emit( 'logout' )
  }

  private executeLogout(): void {
    window.EVENT_BUS.$off()
    clearStorage( keyListToClear )
    clearInterval( this.checkUpdateTimer )
  }

  private beforeDestroy(): void {
    window.EVENT_BUS.$emit( TokenStatus.RESET )
    clearInterval( this.checkUpdateTimer )
  }

  private async prepareData() {
    this.checkUpdateTimer = setInterval( this.checkTokensUpdate, CHECK_NEED_REFRESH_INTERVAL )
    if ( this.isADFS ) {
      clearStorage([ StoreKeys.ADFS_TOKEN ])
    }
    await this.setUser()
  }

  private beforeCreate() {
    initEventBusActions( window.EVENT_BUS )
    window.EVENT_BUS.$on( TokenStatus.ERROR, () => {
      this.logout()
    })
    window.EVENT_BUS.$on( CommonBusEvents.CHANGE_DISPLAY_NAME, ( displayName: string ) => {
      const user: User = decodeJSON( getFromStorage( StoreKeys.USER ) )
      saveUserDataToStorage({ ...user, displayName })
    })
  }

  private reInitializeAPI() {
    if ( !authApi ) {
      const token = getAccessToken()
      if ( token ) {
        window.EVENT_BUS.$emit( TokenStatus.SUCCESS, token )
      }
    }
  }

  private async created(): Promise<any> {
    if ( !isStorageKeysExist() ) {
      console.error( 'Tokens not detected on component creation' )
      this.logout()
      return
    }
    this.reInitializeAPI()
    // если было обновление страницы
    if ( !this.afterLogin ) {
      this.setAllowedPermits()
      await updateTokens()
    }
    this.setAfterLogin( true )
    this.prepareData()
  }

  private checkTokensUpdate(): void {
    if ( !isStorageKeysExist() ) {
      console.error( 'Tokens not found when ckecking tokens update' )
      this.logout()
      return
    }
    const tokensUpdateAt = parseInt( getFromStorage( StoreKeys.UPDATE ), 10 )
    if ( tokensUpdateAt <= Date.now() ) {
      updateTokens().catch( () => {
        this.logout()
      })
    }
  }
}
</script>

<style scoped lang="sass" scoped>
.user-panel
  display: flex
  height: 100%
  align-items: center

.user-name
  width: max-content
  font-family: Roboto, Arial, NotoSans
  color: black
  font-size: 14px
  text-decoration: none

.user-icon
  display: flex
  align-items: center
  justify-content: center
  background-color: #FFF
  border-radius: 13px
  padding: 4px 4px
  margin-right: 12px

.logout-icon
  display: flex
  align-items: center
  justify-content: center
  margin-left: 7px
  padding-top: 4px

button
  background: none
  border: none
</style>
