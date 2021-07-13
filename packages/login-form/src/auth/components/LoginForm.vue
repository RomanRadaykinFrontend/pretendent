<template lang="pug">
  .login-form
    form.user-login-form(
      @submit.prevent="onSubmit()"
    )
      .form-header {{ formHeader }}
      .input-container Домен
        template(v-if="!domainsLoaded")
          input.domains-loading(
            disabled
            value="Получение списка доменов..."
          )
        template(v-else)
          select(
            :disabled="!hasDomains"
            v-model="loginData.domain"
          )
            option(
              v-for="domain in domains"
              :key="domain.name"
              :value="domain.name"
            ) {{ domain.name }} ({{domain.type}})
          .arrow
            include ./../common/assets/images/arrow
      .login-password
        .login-password__container(v-show="!loginData.isADFS")
          .input-container Логин
            input(
                required
                minlength="4"
                autocomplete="username"
                v-model.trim="loginData.login"
            )
          .input-container Пароль
            input(
                required
                minlength="8"
                type="password"
                autocomplete="password"
                v-model.trim="loginData.password"
              )
      .bottom-container
        .status-container
          .error-text( v-if="message" ) {{ message }}
          RemoteDataContainer.remote(
              v-if="showLoader"
              status="PENDING"
            )
        button(
          type="submit"
          :disabled="disabledButton"
        ) Войти
</template>

<script lang="ts">
import {
  Domain, UsersGetRequest, UserFull, initEventBusActions,
} from '../services/api'
import {
  getURLParams, setToStorage, getFromStorage, StoreKeys, AuthError,
} from '../services/helpers'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { LoginData } from '../types/login'
import { RemoteDataStatus } from './../types/common.types'
import { namespace } from 'vuex-class'
import { ActionMethod, MutationMethod } from 'vuex'
import {
  FETCH_USER,
  FETCH_DOMAINS,
  PASS_AUTH,
} from './../store/modules/action.types'
import {
  SET_MESSAGE,
  SET_ALLOWED_PERMITS,
} from './../store/modules/mutation.types'
import RemoteDataContainer from './parts/RemoteDataContainer.vue'

const AS = namespace( 'authStore' )

@Component({ components: { RemoteDataContainer } })
export default class LoginForm extends Vue {
  @Prop({ default: '' }) private systemName!: string
  @Prop({ default: '/' }) private pathAfterLogon!: string
  @Prop({ default: () => [] }) private allowedPermits!: Array<string>

  // Subsidiary works
  @AS.Getter( 'domains' ) private domains!: Array<Domain>
  @AS.Action( FETCH_DOMAINS ) private fetchDomains!: ActionMethod
  @AS.Mutation( SET_ALLOWED_PERMITS ) private setAllowedPermits!: MutationMethod

  // User works
  @AS.Getter( 'user' ) private user!: UserFull
  @AS.Action( FETCH_USER ) private fetchUser!: ( x: UsersGetRequest ) => ActionMethod

  // Login works
  @AS.Getter( 'message' ) private message!: string
  @AS.Getter( 'status' ) private status!: RemoteDataStatus
  @AS.Action( PASS_AUTH ) private passAuth!: ( x: LoginData ) => ActionMethod
  @AS.Mutation( SET_MESSAGE ) private setMessage!: ( x: string ) => MutationMethod

  private domainsLoaded = false

  private loginData: LoginData = {
    domain: '',
    domainType: 'LDAP',
    login: '',
    password: '',
    isADFS: false,
  }

  get disabledButton() {
    return !this.isDataEntered || !this.domainsLoaded
  }


  get showLoader() {
    return this.isLoading || !this.domainsLoaded
  }

  get isLoading() {
    return this.status === RemoteDataStatus.PENDING
  }

  get hasDomains() {
    return this.domains?.length
  }

  get formHeader() {
    return `Вход ${ this.systemName.trim() ? `в "${this.systemName}"` : '' }`
  }

  get isDataEntered(): boolean {
    return ( ( !!this.loginData.login && !!this.loginData.password ) || this.loginData.isADFS )
  }

  @Watch( 'status' ) private onLoginStatusChanged() {
    if ( this.status === RemoteDataStatus.SUCCESS ) {
      this.$emit( 'login' )
      this.$router.push({ path: this.pathAfterLogon })
    }
  }

  @Watch( 'loginData.domain' ) private checkADFS(): void {
    const domain = this.domains.find( c => c.name === this.loginData.domain )
    if ( !domain ) {
      this.loginData.isADFS = false
      return
    }
    const domainType = domain.type
    this.loginData.isADFS = ( domainType && domainType.toUpperCase() === 'ADFS' )
  }

  private redirectToADFS(): void {
    const fromUrl = getURLParams( window.location.href ).from
    const request = {
      domain: this.loginData.domain,
      state: String( Date.now() ),
      redirectTo: window.location.origin + ( fromUrl ?? '' ),
    }
    const URL = window.AUTH_API_URL
    const redirectURL = `${URL}/auth/${request.domain}/signin?state=${request.state}&redirect=${request.redirectTo}`

    window.location.href = redirectURL
    setToStorage( StoreKeys.ADFS_STATE, request.state )
    setToStorage( StoreKeys.ADFS_DOMAIN, request.domain )
  }

  private async onSubmit() {
    if ( this.loginData.isADFS ) {
      setToStorage( StoreKeys.ADFS_DOMAIN, this.loginData.domain )
      this.redirectToADFS()
      return
    }
    this.passAuthorization()
  }

  private passAuthorization() {
    this.passAuth( this.loginData )
  }

  private async checkADFSLogged(): Promise<any> {
    if ( !getFromStorage( StoreKeys.ADFS_TOKEN ) ) {
      return
    }
    this.loginData = {
      ...this.loginData,
      token: getFromStorage( StoreKeys.ADFS_TOKEN ),
      state: getFromStorage( StoreKeys.ADFS_STATE ),
      domain: getFromStorage( StoreKeys.ADFS_DOMAIN ),
      isADFS: true,
    }
    this.passAuthorization()
  }

  private created(): void {
    this.prepareData()
  }

  private async prepareData(): Promise<any> {
    initEventBusActions( window.EVENT_BUS )
    await this.fetchDomains()
    this.domainsLoaded = true
    if ( !this.setDomainsData() ) {
      return
    }
    this.setAllowedPermits( this.allowedPermits )
    this.checkADFSLogged()
  }

  private setDomainsData(): boolean {
    if ( !this.domains ) {
      this.setMessage( AuthError.DOMAIN_DATA_FAILED )
      return false
    }
    if ( this.domains.length !== 0 ) {
      this.loginData.domain = this.domains[0].name
    }
    return true
  }
}
</script>

<style scoped lang="sass" scoped>
@import "../common/assets/styles/variables.sass"
*
  box-sizing: border-box
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', NotoSans

.login-form
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 100vh
  background-color: $page-background

.user-login-form
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  width: 550px
  border-radius: 7px
  box-shadow: 0px 1px 7px $box-shadow
  background-color: $form-background
  padding: 0 50px

.form-header
  display: flex
  justify-content: center
  width: 100%
  margin: 40px 0px 15px 0px
  color: $title-font
  font-weight: bold
  font-size: 24px

.input-container
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column
  color: $input-header
  width: 100%
  font-size: 14px
  margin-top: 10px
  position: relative

.bottom-container
  width: 100%
  margin-top: 20px
  margin-bottom: 20px
  display: flex
  align-items: center
  justify-content: space-between
  color: $error-color

.arrow
  height: 15px
  position: absolute
  right: 10px
  bottom: 10px
  pointer-events: none

select
  width: 100%
  height: 35px
  border: 1px solid $input-header
  border-radius: 3px
  padding-left: 6px
  background: $select-background
  color: $title-font
  width: 100%
  margin-top: 4px
  text-overflow: ellipsis
  overflow: hidden
  -webkit-appearance: none
  -moz-appearance: none
  font-size: 16px

input
  padding: 0 10px
  border: 1px solid $input-header
  border-radius: 3px
  background-color: $form-background
  width: 100%
  height: 35px
  margin-top: 4px
  font-size: 20px
  color: $title-font
  filter: none
  &.domains-loading
    font-size: 16px

input[type=password]
  font: small-caption
  font-size: 20px
  letter-spacing: 2px

button
  border: none
  border-radius: 4px
  background-color: $button-background
  color: $button-font
  padding: 10px 60px
  &:hover
    box-shadow: 0 0 5px rgba(0,0,0,0.5)
  &:disabled
    background: $button-disabled
    pointer-events: none

.login-password
  min-width: 450px
  min-height: 126px
  &__container
    width: 100%

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active
    -webkit-box-shadow: 0 0 0 30px white inset !important
    font-size: 20px

select::-ms-expand
  display: none

.status-container
  display: flex
  align-items: center
  width: 280px
  height: 38px

.remote
  margin-bottom: 20px

.error-text
  font-size: 15px

</style>


