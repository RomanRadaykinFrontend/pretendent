<template lang="pug">
.user-account-edit
  AppModal
    .modal-header
      .modal-header__text
        h3 {{ dialogHeader }}
      .modal-header__close-button(@click="hideModal" )
        include ../../common/assets/icons/close
    RemoteDataContainer( :status="remoteStatus" )
      form.form(
        @submit.prevent="saveUser()"
        autocomplete="off"
      )
        .param-wrapper
          .param__label Домен
          .param__data
            input(
                disabled
                :value="`${user.domain} (${ domainType })`"
              )
        .param-wrapper
          .param__label Логин
          .param__data
            input(
              disabled
              v-model.trim="login"
            )
        .param-wrapper
          .param__label Псевдоним
          .param__data
            input(
              minlength="4"
              maxlength="40"
              autocomplete="new-password"
              v-model.trim="displayName"
              :disabled="!isLocalDomain"
            )
        .param-wrapper( v-if="isLocalDomain" )
          .param__label Новый пароль
            .warinig__icon(
              title=`После смены пароля пользователь будет\nдеавторизован во всех системах`
            )
              include ../../common/assets/icons/warning
          .param__data
            input(
              minlength="8"
              type="password"
              autocomplete="new-password"
              v-model.trim="newPassword"
            )
        .param-wrapper( v-if="isLocalDomain && newPassword" )
          .param__label Повторите пароль
          .param__data
            input(
              minlength="8"
              type="password"
              autocomplete="new-password"
              v-model.trim="newPasswordConfirm"
          )
        EditUserPermits(
          v-if="permissions.length"
          :permits="permissions"
          v-model="userPermits"
        )
        EditUserGroup(
          v-if="hasDomainGroups && isLocalDomain"
          :domainGroups="domainGroups"
          v-model="userGroups"
        )
        EditUserRegions(
          v-if="isEditRegions"
          :regions="regions"
          v-model="userRegions"
        )
        .button-container
          .button-container__left
            .message
              .message__error(v-if="hasInputError") {{ errorMessage }}
          .button-container__right
            button.btn-apply( type="submit" ) Применить
            button.btn-apply( @click.stop="hideModal") Закрыть
</template>

<script lang='ts'>
import { getAddDelLists, SECURE_REGIONS } from '../../services/helpers/userpermissions'
import { AddDelList, KeyValue, Permission, Region, UserCredentials } from '../../types/userpermissions'
import { User, UserFull, Domain, Group } from '../../services/api'
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { isEqual } from 'lodash'
import { ActionMethod } from 'vuex'
import { TokenStatus, CommonBusEvents } from 'login-form'
import RemoteDataContainer from '../RemoteDataContainer.vue'
import { RemoteDataStatus } from '../../types/common'
import EditUserRegions from '../common/EditUserRegions.vue'
import EditUserGroup from '../common/EditUserGroup.vue'
import AppModal from './../common/AppModal.vue'
import { namespace } from 'vuex-class'
import EditUserPermits from '../common/EditUserPermits.vue'

const CM = namespace( 'upCommon' )
const UG = namespace( 'upGroups' )
const UA = namespace( 'upAccounts' )

@Component({
  components: { EditUserPermits, RemoteDataContainer, EditUserRegions, EditUserGroup, AppModal },
})
export default class UserAccountEdit extends Vue {
  @PropSync( 'modalOpen', { type: Boolean }) private open!: boolean
  @PropSync( 'userItem', { type: Object }) private selectedUser!: User

  @UG.Getter( 'groups' ) private groups!: Array<Group>
  @UG.Action( 'groupsAddUser' ) private groupsAddUser: ActionMethod
  @UG.Action( 'groupDeleteUser' ) private groupDeleteUser: ActionMethod

  @UA.Getter( 'user' ) private user!: UserFull
  @UA.Getter( 'domains' ) private domains!: Array<Domain>
  @UA.Getter( 'regions' ) private regions!: Array<Region>
  @UA.Getter( 'userKV' ) private userKV: ( x: string ) => any
  @UA.Action( 'fetchUser' ) private fetchUser: ActionMethod
  @UA.Action( 'userUpdate' ) private userUpdate: ActionMethod
  @UA.Action( 'updateUserKV' ) private updateUserKV: ActionMethod
  @UA.Getter( 'isRegionsEditEnabled' ) private isEditRegions!: boolean
  @UA.Getter( 'userPermits' ) private userPermitsStored!: Array<string>
  @UA.Action( 'updateUserSecureRole' ) private updateUserSecureRole: ActionMethod
  @UA.Action( 'setUserPermits' ) private setPermits: ( x: Array<string> ) => ActionMethod

  @CM.Getter( 'permissions' ) private permissions: Array<Permission>

  private userGroups: Array<Group> = []
  private userRegions: Array<string> = []
  private userPermits: Array<string> = []

  private userGroupsSource: Array<Group> = []
  private userRegionsSource: Array<string> = []
  private userPermitsSource: Array<string> = []

  private hasInputError = false
  private selectedСountry = ''
  private errorMessage = ''
  private remoteStatus = RemoteDataStatus.PENDING
  private newPassword = ''
  private newPasswordConfirm = ''
  private displayName = ''
  private domainType = ''
  private login = ''

  get hasDomainGroups() {
    return this.domainGroups.length
  }

  get domainGroups() {
    return this.groups.filter( g => g.domain === this.user.domain )
  }

  get hasDisplayName() {
    return this.displayName !== ''
  }

  get dialogHeader() {
    return `Редактирование ${this.isCurrentUser ? 'текущей' : ''} учетной записи пользователя`
  }

  get buttonCaption() {
    return this.isLocalDomain ? 'Применить' : 'Закрыть'
  }

  get isCurrentUser() {
    return this.selectedUser.domain === this.user.domain && this.selectedUser.login === this.user.login
  }

  get isCountrySelected() {
    return this.selectedСountry
  }

  get isLocalDomain() {
    return this.domain === '_'
  }

  get isRegionsEqual(): boolean {
    const updated = this.userRegions.sort()
    const source = this.userRegionsSource.sort()
    return isEqual( updated, source )
  }

  get domain() {
    return this.user.domain
  }

  private setUserPermits() {
    debugger
    this.userPermits = this.userPermitsStored
    this.userPermitsSource = [ ...this.userPermits ]
  }

  private setUserGroups() {
    this.userGroups = this.user?.groups ?? []
    this.userGroupsSource = [ ...this.userGroups ]
  }

  private setUserRegions() {
    this.userRegions = this.userKV( SECURE_REGIONS ) ?? []
    this.userRegionsSource = [ ...this.userRegions ]
  }

  private hideModal() {
    this.open = false
  }

  private async setUserKV( kv: KeyValue ) {
    await this.updateUserKV({
      user: this.user,
      ...kv,
    })
  }

  private async updateUserRegions() {
    if ( this.isRegionsEqual ) {
      return
    }
    await this.setUserKV({
      key: SECURE_REGIONS,
      value: JSON.stringify( this.userRegions ),
    })
  }

  private showError( message: string ) {
    this.hasInputError = true
    this.errorMessage = message
  }

  private isDisplayNameChanged(): boolean {
    return this.displayName !== this.selectedUser.displayName
  }

  private isPasswordChanged(): boolean {
    return !!this.newPassword.length || !!this.newPasswordConfirm.length
  }

  private isPasswordsEqual() {
    return this.newPassword === this.newPasswordConfirm
  }

  private async saveUser() {
    const updatedUser: UserCredentials = {
      login: this.login,
      domain: this.domain,
    }
    try {
      await this.updateUserRegions()
    } catch ( e ) {
      this.showError( 'Не удалось установить регионы' )
      return
    }
    try {
      await this.updateUserGroups()
    } catch ( e ) {
      this.showError( 'Не удалось установить группы' )
      return
    }
    try {
      await this.setPermits( this.userPermits )
    } catch ( e ) {
      this.showError( 'Не удалось установить разрешения' )
      return
    }
    if ( this.isDisplayNameChanged() ) {
      updatedUser.displayName = this.displayName
      try {
        await this.userUpdate( updatedUser )
        if ( this.isCurrentUser ) {
          window.EVENT_BUS.$emit(
            CommonBusEvents.CHANGE_DISPLAY_NAME,
            updatedUser.displayName,
          )
        }
      } catch ( error ) {
        this.showError( 'Не удалось обновить псевдоним' )
        return
      }
    }
    if ( this.isPasswordChanged() ) {
      if ( !this.isPasswordsEqual() ) {
        this.showError( 'Пароли не совпадают' )
        return
      }
      updatedUser.displayName = this.displayName
      updatedUser.newPassword = this.newPassword
      try {
        await this.userUpdate( updatedUser )
        if ( this.isCurrentUser ) {
          window.EVENT_BUS.$emit( TokenStatus.ERROR, 'Current user password changed' )
        }
      } catch ( error ) {
        this.showError( 'Не удалось обновить пароль' )
        return
      }
    }

    this.hideModal()
  }

  private created() {
    this.prepareData()
  }

  private async prepareData() {
    this.remoteStatus = RemoteDataStatus.PENDING
    const user: UserCredentials = {
      domain: this.selectedUser.domain,
      login: this.selectedUser.login,
    }
    await this.fetchUser( user )
    this.setUserRegions()
    this.setUserPermits()
    this.setUserGroups()

    this.login = this.user.login
    this.displayName = this.user.displayName ?? ''

    this.domainType = this.domains.find(
      c => c.name === this.user.domain,
    )?.type ?? ''
    this.remoteStatus = RemoteDataStatus.SUCCESS
  }

  private async updateUserGroups() {
    const x: AddDelList = getAddDelLists( this.userGroupsSource, this.userGroups, 'ident' )
    for ( const group of x.toAdd ) {
      await this.groupsAddUser({
        ident: group,
        user: this.user,
      })
    }
    for ( const group of x.toDel ) {
      await this.groupDeleteUser({
        ident: group,
        user: this.user,
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/common"
@import "../../common/assets/styles/form"
@import "../../common/assets/styles/modal"
.user-account-edit::v-deep
  .param__label
    width: 200px
input
  text-overflow: ellipsis
  overflow: hidden
</style>
