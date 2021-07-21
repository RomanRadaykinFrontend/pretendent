<template lang="pug">
.users-group-edit
  AppModal
    .modal-header
      .modal-header__text
        h3 {{ dialogHeader }}
      .modal-header__close-button(@click="close" )
        include ../../common/assets/icons/close
    form.form( @submit.prevent="onSubmit" )
      .param-wrapper
        .param__label Домен
        .param__data
          select(
            disabled
            v-model="domain"
          )
            option(
              v-for="domain in domains"
              :value="domain.name"
            ) {{domain.name }} ({{ domain.type }})
      .param-wrapper
        .param__label Идентификатор
        .param__data
          input(
            :disabled="isEditMode"
            minlength="4"
            maxlength="40"
            v-model.trim="ident"
          )
      .param-wrapper
        .param__label Псевдоним
        .param__data
          input(
            :disabled="!isLocalDomain && isEditMode"
            required
            minlength="4"
            maxlength="40"
            v-model.trim="displayName"
          )
      .param-wrapper( v-if="permits.length")
        .param__label Разрешения
        .param__data
          .permits-wrapper
            AppCheckedItems(
              :values="permitList"
              v-model="selectedPermits"
            )
      .button-container
        .button-container__right
          button.btn-apply(
            @click="close"
          ) Закрыть
          button.btn-apply(
            v-if="showSubmitBtn"
            type="submit"
          ) {{ submitBtnCaption }}
      .modal-message( v-show="hasMessage" )
        AppMessage(
          :message="message"
          @close="closeMessage"
        )
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Domain, Group } from '../../services/api'
import { namespace } from 'vuex-class'
import { ActionMethod } from 'vuex'
import AppModal from './../common/AppModal.vue'
import AppMessage from './../common/AppMessage.vue'
import AppCheckedItems from './../common/AppCheckedItems.vue'
import { DropDownItem, InfoMessage, RemoteDataStatus } from '../../types/common'
import { GroupAllKVRequest, Permission, UpdateGroupPermitPayload } from '../../types/userpermissions'
import { isEqual } from 'lodash'

const CM = namespace( 'upCommon' )
const UG = namespace( 'upGroups' )
const UA = namespace( 'upAccounts' )


@Component({ components: { AppModal, AppMessage, AppCheckedItems } })
export default class UsersGroupEdit extends Vue {
  @Prop() private group!: Group
  @Prop({ default: true }) private isEditMode!: boolean

  @UA.Getter('domains') private domains!: Domain[]
  @UG.Getter('groups') private groups!: Group[]
  @UG.Action('groupsUpdate') private groupsUpdate!: ActionMethod

  @CM.Getter('permissions') private permits!: Array<Permission>
  @UG.Getter('groupPermits') private originalGroupPermits!: Array<string>
  @UG.Action('createGroup') private createGroup!: ( x: Group ) => ActionMethod
  @UG.Action('fetchGroupKV') private fetchGroupKV!: ( x: GroupAllKVRequest ) => ActionMethod
  @UG.Action('setGroupPermits') private setGroupPermits!: ( x: UpdateGroupPermitPayload ) => ActionMethod

  private hasInputError = false
  private originalPermits = []
  private displayName = ''
  private domain = ''
  private ident = ''
  private remoteStatus = RemoteDataStatus.PENDING
  private message: InfoMessage = { type: 'error', text: '' }

  private newPermits: Array<string> = []
  private selectedPermits: Array<DropDownItem> = []

  get permitList(): Array<DropDownItem> {
    let result: Array<DropDownItem> = []
    this.permits?.forEach( r => {
      result.push({
        name: r.alias ?? r.permit,
        value: r.permit
      })
    })
    return result
  }

  @Watch('selectedPermits', { deep: true }) private onSelectedChanged() {
    this.newPermits = this.selectedPermits.map( r => r.value )
  }

  get hasMessage() {
    return !!this.message.text.length
  }

  get isLocalDomain() {
    return this.group.domain === '_'
  }

  get showSubmitBtn() {
    return this.isLocalDomain || !this.isEditMode
  }

  get submitBtnCaption() {
    return this.isEditMode ? 'Применить' : 'Добавить'
  }

  get dialogHeader() {
    if ( this.isEditMode ) {
      return this.isLocalDomain ? 'Редактирование группы' : 'Просмотр группы'
    }
    return 'Добавление группы'
  }

  get isPermitsEqual() {
    return isEqual( [...this.newPermits].sort(), [...this.originalPermits].sort() )
  }

  private closeMessage() {
    this.message.text = ''
  }

  private close() {
    this.$emit('close')
  }

  private showError( message: string ) {
    this.hasInputError = true
    this.message.text = message
  }

  private isNamesExist(): boolean {
    let currentDomainGroups = this.groups.filter( g => g.domain === this.domain )
    if ( this.isEditMode ) {
      currentDomainGroups = currentDomainGroups.filter( g => g.ident !== this.ident )
    }
    return !!currentDomainGroups.find( g => g.ident === this.ident || g.displayName === this.displayName )
  }

  private async onSubmit() {
    this.message.text = ''
    if ( !this.isLocalDomain && this.isEditMode ) {
      this.close()
      return
    }

    if ( this.isNamesExist() ) {
      this.showError('Имя или идентификатор существует')
      return
    }

    try {
      if ( this.isEditMode ) {
        if ( (this.group.displayName === this.displayName ) && this.isPermitsEqual ) {
          this.close()
          return
        }
        const usersGroup: Group = {
          ident: this.ident,
          domain: this.domain,
          displayName: this.displayName,
        }
        await this.groupsUpdate( usersGroup )
      } else {
        // if create group
        await this.createGroup({
          domain: this.domain,
          ident: this.ident,
          displayName: this.displayName,
        })
      }
      await this.setPermit()
    } catch ( e ) {
      this.showError(`Ошибка при сохранении ${e?.message ?? ''}`)
      return
    }
    this.close()
  }

  private async setPermit() {
    if ( this.isPermitsEqual ) {
      return
    }
    const group: Group = this.isEditMode
      ? this.group
      : { domain: this.domain, ident: this.ident }

    const payload: UpdateGroupPermitPayload = {
      group,
      permits: {
        new: [...this.newPermits],
        original: [...this.originalPermits],
      }
    }
    this.originalPermits = [...this.newPermits]
    await this.setGroupPermits( payload )
  }

  private created() {
    this.domain = this.domains[0].name
    if ( this.domains.length ) {
      this.domain = this.domains.find( d => d.type === 'local' ).name
    }
    if ( this.isEditMode ) {
      this.ident = this.group.ident!
      this.displayName = this.group.displayName!
      this.prepareData()
    }
  }

  public async prepareData() {
    await this.fetchGroupKV({
      domain: this.group.domain,
      ident: this.group.ident,
    })
    this.originalPermits = this.originalGroupPermits
    this.selectedPermits = this.permitList.filter( r => this.originalPermits.includes(r.value) )
    this.newPermits = [...this.originalPermits]
  }

}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/common"
@import "../../common/assets/styles/form"
@import "../../common/assets/styles/modal"
input
  padding-right: 10px
  text-overflow: ellipsis
  overflow: hidden
.form
  width: 500px
.button-container
  justify-content: flex-end
.permits-wrapper
  margin-top: 5px
  height: 110px
  max-height: 300px
</style>