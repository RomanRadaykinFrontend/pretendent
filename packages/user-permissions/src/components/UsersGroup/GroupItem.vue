<template lang="pug">
.group-item
  .tr( @dblclick="editGroup()")
    .td.group__name {{ group.displayName }}
    .td.group__ident {{ group.ident }}
    .td.group__domain.td__actions {{ group.domain }} ({{ domainType }})
      .actions
        .show-users(
          title="Пользователи группы"
          @click.stop="showGroupUsers()"
        )
          include ../../common/assets/icons/users
        .remove-item(
          title="Удалить группу"
          @click.stop="deleteGroup()"
        )
          include ../../common/assets/icons/remove
        .edit-item(
          v-if="isLocalDomain"
          title="Изменить группу"
          @click.stop="editGroup()"
        )
          include ../../common/assets/icons/edit
        .view-item(
          v-if="!isLocalDomain"
          title="Просмотр группы"
          @click.stop="editGroup()"
        )
          include ../../common/assets/icons/eye
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Domain, Group } from '../../services/api'

@Component
export default class GroupItem extends Vue {
  @Prop() private group!: Group
  @Prop() private domains!: Array<Domain>

  get isLocalDomain() {
    return this.group.domain === '_'
  }

  get domainType() {
    return this.domains?.find( d => d.name === this.group.domain )?.type ?? ''
  }

  private deleteGroup() {
    this.$emit('delete')
  }

  private editGroup() {
    this.$emit('edit')
  }
  private showGroupUsers() {
    this.$emit('show-users')
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/table"
</style>
