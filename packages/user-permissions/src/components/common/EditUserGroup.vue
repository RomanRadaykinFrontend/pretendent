<template lang="pug">
  .edit-user-group
    .param-wrapper
      .param__label Группы разрешений
      .param__data
        .param__data-wrapper( v-if="hasDomainGroups && isLocalDomain"  )
          select(
            v-model="groupIdent"
            :disabled="isAllGroupsAdded"
          )
            option(
              v-for="group in groupList"
              :value="group.ident"
              :disabled="!group.ident"
            ) {{ group.displayName }}
          .add-item(
            v-show="!isAllGroupsAdded"
            title="Добавить группу пользователю"
            @click.stop="addGroup"
          )
            include ../../common/assets/icons/add
        .no-data(v-if="!hasDomainGroups") В домене отсутствуют группы
    .param-wrapper( v-if="hasDomainGroups" )
      .param__label
        .div( v-if="hasDomainGroups && !isLocalDomain" ) Группы
      .param__data
        .user-groups__list( v-if="hasUserGroups" )
          .user-groups__list-item(
            v-for="item in userGroups"
            :key="item.ident"
          )
            .group-name {{ item.displayName }}
            .remove-item(
              v-if="isLocalDomain"
              title="Удалить группу"
              @click.stop="removeGroup(item.ident)"
            )
              include ../../common/assets/icons/remove
        .no-data(
          v-if="hasDomainGroups && !hasUserGroups"
        ) Группы разрешений не заданы
</template>

<script lang="ts">

import { cloneDeep, isEqual } from 'lodash'
import { Group, UserFull } from '../../services/api'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class EditUserGroup extends Vue {
  @Prop() private user: UserFull | undefined
  @Prop({ default: () => [] }) private value: Array<Group>
  @Prop({ default: () => [] }) private domainGroups: Array<Group>

  private groupIdent = ''
  private userGroups = []

  get isLocalDomain() {
    return this.domain === '_'
  }

  get domain() {
    return this.user?.domain ?? '_'
  }

  get hasUserGroups() {
    return this.userGroups?.length
  }

  get hasDomainGroups() {
    return this.domainGroups.length
  }

  get groupList() {
    const groups = [...this.domainGroups]
    groups.unshift({
        displayName: this.isAllGroupsAdded ? 'Выбраны все группы' : 'Выберите группу' ,
        domain: '',
        ident: '',
      })
    return groups.filter( g => !this.userGroups.includes( g.ident ))
  }

  get isAllGroupsAdded() {
    return this.userGroups.length === this.domainGroups.length
  }

  get valueStringifyed() {
    return JSON.stringify( this.value )
  }

  get userGroupsStringifyed() {
    return JSON.stringify( this.userGroups )
  }

  @Watch('valueStringifyed') private onValueChanged() {
    this.userGroups = cloneDeep( this.value )
  }

  @Watch('userGroupsStringifyed') private onGroupsChanged() {
    this.$emit('input', this.userGroups)
  }

  private addGroup() {
    if ( !this.groupIdent ) {
      return
    }
    if ( this.userGroups.find( g => g.ident === this.groupIdent)) {
      return
    }
    const group = this.groupList.find( c => c.ident === this.groupIdent )
    const next = this.getNextGroup( this.groupIdent )
    this.userGroups.push( group )
    this.groupIdent = next
  }

  private removeGroup( ident: string) {
    this.userGroups = this.userGroups.filter( g => g.ident !== ident )
  }

  // Get next region item at allowed region list
  private getNextGroup( ident: string ): string {
    const index = this.groupList.map( r => r.ident).indexOf( ident )
    // if select the only remaining item
    if ( this.groupList.length === 2) {
      return ''
      // if select last item - try select previous item
    } else if ( index === this.groupList.length - 1 ) {
      return this.groupList[ index - 1 ]?.ident ?? this.groupList[0].ident
    }
    // select next item
    return this.groupList[ index + 1 ].ident
  }

}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/common"
@import "../../common/assets/styles/form"
</style>
