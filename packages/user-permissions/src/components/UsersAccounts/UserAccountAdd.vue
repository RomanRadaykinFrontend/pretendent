<template lang="pug">
.user-account-add
  AppModal
    .modal-header
      .modal-header__text
        h3 Добавление учетной записи пользователя
      .modal-header__close-button(@click="hideModal" )
        include ../../common/assets/icons/close
    form.form(
      @submit.prevent="createNewAccount"
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
            required
            minlength="4"
            maxlength="40"
            autocomplete="new-password"
            v-model.trim="user.login"
          )
      .param-wrapper
        .param__label Псевдоним
        .param__data
          input(
            required
            minlength="4"
            maxlength="40"
            autocomplete="new-password"
            v-model.trim="user.displayName"
          )
      .param-wrapper
        .param__label Пароль
        .param__data
          input(
            required
            minlength="8"
            type="password"
            autocomplete="new-password"
            v-model.trim="user.password"
          )
      .param-wrapper
        .param__label Повторите пароль
        .param__data
          input(
            required
            minlength="8"
            type="password"
            autocomplete="new-password"
            v-model.trim="passwordRepeat"
          )
      EditUserPermits(
        v-if="permissions.length"
        :permits="permissions"
        v-model="userPermits"
      )
      EditUserGroup(
        v-if="domainGroups.length"
        :domainGroups="domainGroups"
        v-model="userGroups"
      )
      EditUserRegions(
        v-if="isEditRegions"
        :regions="regions"
        v-model="userRegions"
      )
      .button-container
        .message
          .message__error(v-if="hasInputError") {{ errorMessage }}
        button.btn-apply(
          type="submit"
        ) Добавить
</template>

<script lang="ts">
import { SECURE_REGIONS } from '../../services/helpers/userpermissions'
import { GroupUser, Permission, Region, UserCredentials, UserKV } from '../../types/userpermissions'
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { User, Domain, Group } from '../../services/api'
import { namespace } from 'vuex-class'
import { ActionMethod } from 'vuex'
import EditUserRegions from '../common/EditUserRegions.vue'
import AppModal from './../common/AppModal.vue'
import EditUserGroup from '../common/EditUserGroup.vue'
import EditUserPermits from '../common/EditUserPermits.vue'

const CM = namespace('upCommon')
const UG = namespace('upGroups')
const UA = namespace('upAccounts')

@Component({ components: { EditUserRegions, EditUserGroup, AppModal, EditUserPermits }} )
export default class UserAccountAdd extends Vue {
  @PropSync('modalOpen', { type: Boolean }) private open!: boolean

  @UA.Getter('users') private users!: Array<User>
  @UA.Getter('domains') private domains!: Array<Domain>
  @UA.Getter('regions') private regions!: Array<Region>
  @UA.Getter('isRegionsEditEnabled') private isEditRegions!: boolean
  @UA.Action('updateUserKV') private updateUserKV: ( x: UserKV ) => ActionMethod
  @UA.Action('createUser') private createUser: ( x: UserCredentials ) => ActionMethod
  @UA.Action('setUserPermits') private setUserPermits: ( x: Array<string> ) => ActionMethod


  @UG.Getter('groups') private groups!: Group[]
  @UG.Action('groupsAddUser') private groupsAddUser: ( x: GroupUser ) => ActionMethod

  @CM.Getter('permissions') private permissions: Array<Permission>

  private userGroups: Array<Group> = []
  private userRegions: Array<string> = []
  private userPermits: Array<string> = []

  private hasInputError = false
  private passwordRepeat = ''
  private selectedGroup = ''
  private errorMessage = ''
  private domainType = ''
  private user: UserCredentials = {
    domain: '',
    login: '',
    password: '',
    displayName: '',
  }

  get hasUserGroups() {
    return this.userGroups.length
  }

  get domainGroups() {
    return this.groups.filter( g => g.domain === this.user.domain )
  }

  private hideModal() {
    this.open = false
  }

  private showError(message: string) {
    this.hasInputError = true
    this.errorMessage = message
  }

  private isDataCorrect(): boolean {
    if (this.user.password !== this.passwordRepeat) {
      this.showError('Пароли не совпадают')
      return false
    }
    return true
  }

  private isUserExist(): boolean {
    const exist = !!this.users.find(
      u => u.domain === this.user.domain && u.login === this.user.login
    )
    if ( exist ) {
      this.showError('Такой пользователь уже существует')
      return true
    }
    return false
  }

  private async setUserRegions() {
    if ( this.userRegions.length ) {
      await this.updateUserKV({
        user: this.user,
        key: SECURE_REGIONS,
        value: JSON.stringify( this.userRegions ),
      })
    }
  }

  private async createNewAccount() {
    if ( !this.isDataCorrect() || this.isUserExist() ) {
      return
    }
    await this.createUser( this.user )
    await this.setUserPermits( this.userPermits )
    for ( const group of this.userGroups) {
      await this.groupsAddUser({
        ident: group.ident,
        user: this.user,
      })
    }
    await this.setUserRegions()
    this.hideModal()
  }

  private created() {
    if (this.domains.length) {
      this.user.domain = this.domains.find( d => d.type === 'local' ).name
    }
    if (this.groups.length) {
      this.selectedGroup = this.groups[0].ident
    }
    this.domainType = this.domains.find(
      c => c.name === this.user.domain,
    )?.type ?? ''
  }

  public async setUserKV({key, value}) {
    await this.updateUserKV({
      user: this.user,
      key,
      value,
    })
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/common"
@import "../../common/assets/styles/form"
@import "../../common/assets/styles/modal"
.user-account-add::v-deep
  .param__label
    width: 200px
input
  text-overflow: ellipsis
  overflow: hidden
</style>