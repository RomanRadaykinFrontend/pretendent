<template lang="pug">
.group-users
  AppModal
    .modal-header
      .modal-header__text
        h3 Пользователи группы
      .modal-header__close-button(@click="hideModal" )
        include ../../common/assets/icons/close
    .form
      .form__header
        .domain
          p Домен:
            span  {{ group.domain }} ({{ domainType }})
        .group
          p Группа:
            span {{ group.displayName }}
        .add-user(
          v-if="isLocalDomain"
        ) Добавить пользователя в группу:
          .add-user__select
            select( v-model="selectedUser" )
              option(
                  v-for="user in filteredDomainUsers"
                  :value="user.login"
                  :disabled = "isDisabledItem(user.domain)"
                ) {{ user.login }}
            .add-item(
                v-show="!isAllUsersAdded"
                title="Добавить пользователя в группу"
                @click.stop="addUserToGroup()"
              )
                include ../../common/assets/icons/add
      RemoteDataContainer.remote__container( :status="remoteStatus" )
        .thead.unselectable(v-if="!hasNoUsers")
          .th Псевдоним
          .th Логин
        .no-data(v-if="hasNoUsers")
          | Нет пользователей в данной группе
        .form__data
          .tbody
            GroupUserItem(
              v-for="user in groupUsers"
              :user="user"
              :ident="group.ident"
              :key="user.domain+user.login"
              @delete-group-user="deleteGroupUser"
            )
      .button-container
        .blank
        button.btn-apply(
          type="button"
          @click="hideModal()"
        ) Закрыть
</template>

<script lang="ts">
import GroupUserItem from '../UsersGroup/GroupUserItem.vue'
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Domain, Group, User } from '../../services/api'
import { ActionMethod } from 'vuex'
import RemoteDataContainer from '../RemoteDataContainer.vue'
import { RemoteDataStatus } from '../../types/common'
import  AppModal from './../common/AppModal.vue'

const UG = namespace('upGroups')

@Component({ components: { GroupUserItem, RemoteDataContainer, AppModal } })
export default class GroupUsers extends Vue {
  @PropSync('groupItem', { type: Object }) private group!: Group
  @PropSync('modalOpen', { type: Boolean }) private open!: boolean

  @UG.Getter( 'users') private users!: Array<User>
  @UG.Getter( 'domains' ) private domains!: Array<Domain>
  @UG.Getter( 'groupUsers' ) private groupUsers!: Array<User>
  @UG.Action( 'groupsAddUser' ) private groupsAddUser!: ActionMethod
  @UG.Action( 'fetchGroupUsers' ) private fetchGroupUsers!: ActionMethod

  private selectedUser = ''
  private remoteStatus = RemoteDataStatus.PENDING

  get isAllUsersAdded() {
    return this.filteredDomainUsers.length === 1
  }

  get isLocalDomain() {
    return this.group.domain === '_'
  }

  get domainType() {
    const result = this.domains.find(c => c.name === this.group.domain)!.type
    return result
  }

  get hasNoUsers() {
    return this.groupUsers.length === 0
  }

  get domainUsers(){
    const users = this.users.filter( c => c.domain === this.group.domain )
    if (users.length) {
      users.unshift({
        displayName: 'Выберите пользователя',
        domain: '',
        login: 'Выберите пользователя',
      })
      this.selectedUser = users[0].login!
    }
    return users
  }

  get filteredDomainUsers() {
    const groupUserLogins = this.groupUsers.map( c => c.login )
    return this.domainUsers.filter( c => !groupUserLogins.includes(c.login) )
  }

  private isDisabledItem(value: string): boolean {
    return !value
  }

  private deleteGroupUser( user: any ) {
    this.$emit('delete-group-user', user)
    this.selectedUser = this.getNextUser( user )
  }

  private async addUserToGroup(){
    if (this.groupUsers.filter(c => c.login === this.selectedUser).length) {
      return
    }
    const next = this.getNextUser( this.selectedUser )
    await this.groupsAddUser({
        ident: this.group.ident,
        user:  this.domainUsers.find( c => c.login === this.selectedUser),
    })
    this.selectedUser = next
    this.prepareData()
  }

  private hideModal() {
    this.open = false
  }

  private created() {
    this.prepareData()
  }

  private async prepareData() {
    this.remoteStatus = RemoteDataStatus.PENDING
    await this.fetchGroupUsers({
      domain: this.group.domain,
      ident: this.group.ident,
    })
    this.remoteStatus = RemoteDataStatus.SUCCESS
  }

  // Get next region item at allowed region list
  private getNextUser( login: string ): string {
    const index = this.filteredDomainUsers.map( r => r.login).indexOf( login )
    // if select the only remaining item
    if ( this.filteredDomainUsers.length === 2) {
      return ''
      // if select last item - try select previous item
    } else if ( index === this.filteredDomainUsers.length - 1 ) {
      return this.filteredDomainUsers[ index - 1 ]?.login ?? ''
    }
    // select next item
    return this.filteredDomainUsers[ index + 1 ].login
  }

}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/table"
@import "../../common/assets/styles/common"
@import "../../common/assets/styles/form"
@import "../../common/assets/styles/modal"
.form
  width: 400px
.no-data
  height: 70px
  display: flex
  align-items: center
  justify-content: center
  color: #2F3855
p
  line-height: 25px
  font-size: 14px
  font-weight: bold

span
  margin-left: 10px
  font-weight: 100

.group
  margin-bottom: 10px

.form__data
  max-height: 300px
  overflow-x: hidden
  @include custom-scroll-bar


.add-user
  margin-bottom: 20px
  &__select
    margin-top: 5px
    display: flex
    position: relative

.add-item
  position: absolute
  padding-top: 2px
  right: 5px

.remote__container
  min-height: 70px
  background: white
</style>