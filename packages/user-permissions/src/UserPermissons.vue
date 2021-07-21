<template lang="pug">
.user-permissons-view
  UserAccountAdd(
    v-if="modalOpen"
    :modalOpen.sync="modalOpen"
  )
  UserAccountEdit(
    v-if="userEditModal.open"
    :modalOpen.sync="userEditModal.open"
    :userItem.sync="userEditModal.user"
  )
  UsersGroupEdit(
    v-if="groupOpen"
    :group="group"
    :isEditMode="isGroupEditMode"
    @close="closeGroupEdit"
  )
  GroupUsers(
    v-if="groupUsersModalOpen"
    :modalOpen.sync="groupUsersModalOpen"
    :groupItem.sync="groupUsersModal.group"
    @delete-group-user="deleteGroupUser"
  )
  ConfirmDialog(
    v-if="dialogOpen"
    :modalOpen.sync="dialogOpen"
    :params.sync="dialogParams"
    @confirm="dialogConfirmed"
  )
  .top-panel
    .top-panel__left
      .radio-toolbar.unselectable
        input(
          :disabled="!isDataLoaded"
          id="radioUsers"
          type="radio"
          value="usersAccounts"
          v-model="selection"
        )
        label(
          for="radioUsers"
        )   Пользователи
        input(
          :disabled="!isDataLoaded"
          id="radioPermissons"
          type="radio"
          value="groups"
          v-model="selection"
        )
        label(
          for="radioPermissons"
        ) Группы
    .top-panel__right.unselectable
      button.btn-add(
        :disabled="!isDataLoaded"
        v-show="selection === 'usersAccounts'"
        @click="addItem()"
      ) Добавить учетную запись
      button.btn-add(
        v-show="selection === 'groups'"
        @click="addItem()"
      ) Добавить группу
  .content
    .user-accounts-list(v-show="selection === 'usersAccounts'")
      .thead.unselectable
        .th( @click="setSorting( 'displayName', usersSort )" ) Псевдоним
          AppFilterArrow( :type="getSortArrowsType( 'displayName', usersSort )" )
        .th( @click="setSorting( 'login', usersSort )" ) Логин
          AppFilterArrow( :type="getSortArrowsType( 'login', usersSort )" )
        .th( @click="setSorting( 'domain', usersSort )" ) Домен
          AppFilterArrow( :type="getSortArrowsType( 'domain', usersSort )" )
      .tbody
        RemoteDataContainer.remote__container( :status="remoteStatus" )
          .no-data(v-if="isDataError") Не удалось загрузить данные
          .data(v-if="isDataLoaded || !isDataError")
            UserAccountItem(
              v-for="user, index in actualUsers"
              :account="user"
              :key="user.domain+user.login"
              :isLoggedUser="isLoggedUser( user )"
              :domains="domains"
              @edit-user="editUser( user )"
              @delete-user="deleteUser( user )"
              @block-user="blockUser( user )"
              @unblock-user="unBlockUser( user )"
            )
    .users-groups-list(v-show="selection === 'groups'")
      .thead.unselectable
        .th( @click="setSorting( 'displayName', groupSort )" ) Группа
          AppFilterArrow( :type="getSortArrowsType( 'displayName', groupSort )" )
        .th( @click="setSorting( 'ident', groupSort )" ) Идентификатор
          AppFilterArrow( :type="getSortArrowsType( 'ident', groupSort )" )
        .th( @click="setSorting( 'domain', groupSort )" ) Домен
          AppFilterArrow( :type="getSortArrowsType( 'domain', groupSort )" )
      .tbody
        RemoteDataContainer.remote__container( :status="remoteStatus" )
          .no-data(v-if="isDataError") Не удалось загрузить данные
          .no-data(v-if="hasNoGroups") Группы отсутствуют
          GroupItem(v-for="group in actualGroups"
            :group="group"
            :domains="domains"
            :key="group.domain+group.ident"
            @edit="editGroup( group )"
            @delete="removeGroup( group )"
            @show-users="showGroupUsers( group )"
          )
</template>

<script lang="ts">
import { changeSort, sortItems } from './services/helpers/userpermissions'
import UserAccountEdit from './components/UsersAccounts/UserAccountEdit.vue'
import UserAccountItem from './components/UsersAccounts/UserAccountItem.vue'
import UserAccountAdd from './components/UsersAccounts/UserAccountAdd.vue'
import AppFilterArrow from './components/common/AppFilterArrow.vue'

import UsersGroupEdit from './components/UsersGroup/UsersGroupEdit.vue'
import GroupItem from './components/UsersGroup/GroupItem.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import GroupUsers from './components/UsersGroup/GroupUsers.vue'

import { namespace } from 'vuex-class'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { DialogStatus } from './services/helpers/userpermissions'
import { DialogParams, Region, Permission } from './types/userpermissions'
import { Domain, Group, User } from './services/api'
import { ActionMethod, MutationMethod } from 'vuex'
import { UserFull } from 'login-form'
import RemoteDataContainer from './components/RemoteDataContainer.vue'
import { RemoteDataStatus, SortType} from './types/common'
import { initEventBusActions } from './services/api/index'

const CM = namespace( 'upCommon' )
const AS = namespace( 'authStore' )
const UG = namespace( 'upGroups' )
const UA = namespace( 'upAccounts' )

@Component(
  { components: {
    UserAccountItem, UserAccountAdd, UserAccountEdit, ConfirmDialog,
    GroupItem, UsersGroupEdit, GroupUsers, RemoteDataContainer, AppFilterArrow
  }})

export default class UserPermissons extends Vue {
  @Prop({ default: () => [] }) private permits: Permission[]
  @Prop({ default: null }) private regions: Region[]

  @UG.Action('groupDeleteUser') private groupDeleteUser!: ActionMethod
  @UG.Action('groupsDelete') private groupsDelete!: ActionMethod
  @UG.Action('blockUser') private doBlockUser!: ActionMethod
  @UG.Getter('groups') private groups!: Group[]
  @UG.Action('fetchAllGroups') private fetchGroupList: (x: Domain[]) => ActionMethod

  @UA.Action('fetchUsers') private fetchUsers!: ActionMethod
  @UA.Action('fetchDomains') private fetchDomains!: ActionMethod
  @UA.Action('deleteUser') private removeUser!: ActionMethod
  @UA.Getter('domains') private domains!: Domain[]
  @UA.Getter('users') private users!: Array<User>
  @UA.Mutation('setRegions') private setRegions!: MutationMethod

  @AS.Getter( 'user' ) private user: UserFull
  @CM.Mutation( 'setPermissions' ) private setPermissions: (x: Array<Permission> ) => MutationMethod

  private group: Group = {}
  private selection = 'usersAccounts'
  private modalOpen = false
  private groupOpen = false
  private isGroupEditMode = false
  private usersSort: SortType = {
    field: 'displayName',
    direction: 'desc'
  }
  private groupSort: SortType = {
    field: 'displayName',
    direction: 'desc'
  }


  private editModal = {
    open: false,
    account: {},
  }
  private groupsEditModal = {
    open: false,
    group: {},
  }
  private groupUsersModalOpen = false
  private groupUsersModal = {
    open: false,
    group: {},
  }
  private userEditModalOpen = false
  private userEditModal = {
    open: false,
    user: {},
  }
  private dialogOpen = false
  private dialogParams: DialogParams
  private selectedUser = {}
  private selecteGroup = {}
  private selectedGroupUser = {}
  private remoteStatus = RemoteDataStatus.SUCCESS
  private requestTimeout = 15e3

  get hasNoGroups() {
    return !this.groups.length
  }

  get isDataLoaded() {
    return this.remoteStatus === RemoteDataStatus.SUCCESS
  }

  get isDataError() {
    return [RemoteDataStatus.ERROR, RemoteDataStatus.ERROR_NO_BG].includes(this.remoteStatus)
  }

  @Watch('regions', {deep: true}) private onRegionsChange() {
    this.setRegions( this.regions )
  }

  private isLoggedUser( user: User ) {
    return this.user.domain === user.domain && this.user.login === user.login
  }

  private closeGroupEdit() {
    this.groupOpen = false
  }

  private dialogConfirmed() {
    switch ( this.dialogParams.status ) {
      case DialogStatus.DELETE_USER:
          this.removeUser( this.selectedUser )
        break;
      case DialogStatus.DELETE_GROUP:
          this.groupsDelete( this.selecteGroup )
        break;
      case DialogStatus.DELETE_GROUP_USER:
          this.groupDeleteUser( this.selectedGroupUser )
        break;
      case DialogStatus.BLOCK_USER:
        this.doBlockUser({
            user: this.selectedUser,
            blocked: true
          })
        break;
      case DialogStatus.UNBLOCK_USER:
        this.doBlockUser({
            user: this.selectedUser,
            blocked: false,
          })
        break;

      default:
        break;
    }
    this.selectedUser = {}
    this.selecteGroup = {}
    this.selectedGroupUser = {}
  }

  get actualUsers() {
    return sortItems( this.users, this.usersSort.field, this.usersSort.direction )
  }

  get actualGroups() {
    return sortItems( this.groups, this.groupSort.field, this.groupSort.direction )
  }

  private getSortArrowsType( field: string, sortObj ){
    return field === sortObj.field ?
        sortObj.direction :
        'default'
  }

  private setSorting( field: string, sortObj: SortType ){
    changeSort( field, sortObj )
  }

  private addItem() {
    if (this.selection === 'usersAccounts') {
      this.modalOpen = true
    }
    if ( this.selection === 'groups' ) {
      this.isGroupEditMode = false
      this.groupOpen = true
    }
  }

  private editUser( user: User ) {
    this.userEditModal.user = user
    this.userEditModal.open = true
  }

  private editGroup( group: Group ) {
    this.group = group
    this.isGroupEditMode = true
    this.groupOpen = true
  }

  private showGroupUsers(group: Group) {
    this.groupUsersModalOpen = true
    this.groupUsersModal.open = true
    this.groupUsersModal.group = group
  }

  private deleteUser(user: User) {
    this.selectedUser = user
    this.dialogParams = {
      header: 'Удалить пользователя ?',
      buttonCaption: 'Удалить',
      status: DialogStatus.DELETE_USER,
      user: user.login,
      domain: this.getDomainDescription( user.domain )
    }
    this.dialogOpen = true
  }

  private deleteGroupUser(groupUser: any){
    this.selectedGroupUser = groupUser
    this.dialogParams = {
      header: 'Удалить пользователя из группы ?',
      buttonCaption: 'Удалить',
      status: DialogStatus.DELETE_GROUP_USER,
      user: groupUser.user.login,
      domain: this.getDomainDescription( groupUser.user.domain ),
      group: groupUser.ident,
    }
    this.dialogOpen = true
  }

  private blockUser(user: User) {
    this.selectedUser = user
    this.dialogParams = {
      header: 'Заблокировать пользователя ?',
      buttonCaption: 'Заблокировать',
      status: DialogStatus.BLOCK_USER,
      user: user.login,
      domain: this.getDomainDescription( user.domain )
    }
    this.dialogOpen = true
  }

  private unBlockUser(user: User) {
    this.selectedUser = user
    this.dialogParams = {
      header: 'Разбокировать пользователя ?',
      buttonCaption: 'Разблокировать',
      status: DialogStatus.UNBLOCK_USER,
      user: user.login,
      domain: this.getDomainDescription( user.domain )
    }
    this.dialogOpen = true
  }

  private removeGroup(group: Group) {
    this.selecteGroup = group
    this.dialogParams = {
      header: 'Удалить группу ?',
      buttonCaption: 'Удалить',
      status: DialogStatus.DELETE_GROUP,
      group: group.ident,
      domain: this.getDomainDescription( group.domain )
    }
    this.dialogOpen = true
  }

  private getDomainDescription(domain: string): string {
    return `${domain}(${this.domains.find( c => c.name === domain)!.type} )`
  }

  private setPermissionList() {
    if ( this.permits?.length ) {
      this.setPermissions( this.permits )
    }
  }

  private created() {
    initEventBusActions( window.EVENT_BUS )
    this.prepareData()
  }

  private async prepareData() {
    this.remoteStatus = RemoteDataStatus.PENDING
    this.setPermissionList()
    this.setRegions( this.regions )
    await this.fetchData( this.user )
    this.remoteStatus = RemoteDataStatus.SUCCESS
  }

  private async fetchData(user: any) {
    await this.fetchDomains()
    await this.fetchUsers()
    await this.fetchGroupList( this.domains )
  }
}
</script>

<style lang="sass" scoped>
@import "./common/assets/styles/common"
@import "./common/assets/styles/form"
@import "./common/assets/styles/modal"
*
  font-family: Roboto, Arial, sans-serif
  margin: 0
  padding: 0
  box-sizing: border-box

h3
  font-size: 15px
  font-weight: 700

.unselectable, .unselectable *
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none


.user-permissons-view
  padding: 15px
  display: flex
  flex-direction: column
  width: max-content
  margin: 0 auto

.user-accounts-list::v-deep, .users-groups-list::v-deep
  width: 1200px
  color: #222c3d
  font-family: Roboto
  font-size: 14px
  text-align: left
  .thead, .tr
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    width: 100%
  .thead
    background-color: #BCC2DF
    font-size: 12px
    border-top-left-radius: 6px
    border-top-right-radius: 6px
  .th
    padding: 7px 10px
    font-weight: bold
    font-size: 14px
    display: flex
    justify-content: space-between
    cursor: pointer
  .td
    font-size: 14px
    padding: 0 10px
    display: flex
    line-height: 40px
    &.status-n-actions
      width: 150px
      justify-content: space-between

  .td+.td
    border-left: 1px solid #dddddd
  .tbody
    border-left: 1px solid #dddddd
    border-right: 1px solid #dddddd
  .tr
    border-bottom: 1px solid #dddddd
    height: 40px
    background-color: #fff
    &:hover
      background-color: #BCC2DF
      td
        border-color: transparent
      .actions
        opacity: 1

  .and-actions
    display: flex
    justify-content: space-between

  .actions
    display: flex
    opacity: 0
    cursor: pointer

.top-panel
  display: flex
  width: 1194
  justify-content: space-between
  padding-right: 6px
  margin-bottom: 10px
  &__right
    display: flex
    align-items: center
    justify-content: center
.btn
  &-add
    height: 30px
    border: none
    border-radius: 5px
    padding: 0 10px
    background: #2F3855
    color: white
    font-size: 15px
    &:hover
      box-shadow: 0 0 5px rgba(0,0,0,0.5)
    &:disabled
      pointer-events: none
      background-color: #A9A9A9

.radio-toolbar
  display: flex
  align-items: center

.radio-toolbar input[type="radio"]
  opacity: 0
  position: fixed
  width: 0

.radio-toolbar label
  display: flex
  align-items: center
  height: 30px
  padding: 0 10px
  background-color: #ddd
  font-size: 15px
  border-radius: 4px
  color: #2F3855
  margin-right: 5px
  &:hover
    box-shadow: 0 0 5px rgba(0,0,0,0.5)

.radio-toolbar input[type="radio"]:focus + label
  background: #2F3855
  color: white

.radio-toolbar input[type="radio"]:checked + label
  background: #2F3855
  color: #FFF

.radio-toolbar input[type="radio"]:disabled + label
  background: #A9A9A9
  color: #FFF
  pointer-events: none
.content
  min-height: 200px
  padding: 0 5px 0 0
  @include custom-scroll-bar

.remote__container
  min-height: 300px
  background: white

.no-data
  height: 300px
  margin-right: 5px
  display: flex
  justify-content: center
  align-items: center
  background-color: #fff
  padding: 20px
  font-family: Roboto, Arial, sans-serif
  font-weight: bold
  font-size: 40px
  color: rgba(109, 113, 138, 0.3)

</style>
