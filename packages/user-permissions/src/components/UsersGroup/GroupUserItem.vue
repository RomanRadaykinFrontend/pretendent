<template lang="pug">
.group-users-item
  .tr
    .td
      .name {{ user.displayName }}
    .td
      .login {{ user.login }}
      .actions
        .remove-item(
          v-if="isLocalDomain"
          title="Удалить пользователя из группы"
          @click.stop="deleteUser()"
        )
          include ../../common/assets/icons/remove
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { User } from '../../services/api'

@Component
export default class GroupUserItem extends Vue {

  @Prop({ default: '' }) private ident!: string
  @Prop({ default: null }) private user!: User

  get isLocalDomain() {
    return this.user.domain === '_'
  }

  private deleteUser() {
    this.$emit('delete-group-user',
      {
        ident: this.ident,
        user: this.user,
      }
    )
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/table"
.td
  justify-content: space-between
  .login, .name
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .actions
    cursor: pointer

</style>
