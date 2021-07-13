<template lang="pug">
.user-account-item
  .tr(
    :class="{ 'logged-user': isLoggedUser }"
    @dblclick.stop="editUser()"
  )
    .td.account__name {{ account.displayName }}
      .blocked(
        v-if="isBlocked"
        title="Пользователь заблокирован"
      )
        include ../../common/assets/icons/blockeduser
    .td.account__login {{ account.login }}
    .td.account__domain.td__actions {{ account.domain }} ({{ domainType }})
      .actions
        .block-item(
            v-if="!isBlocked && !isLoggedUser"
            title="Заблокировать пользователя"
            @click.stop="blockUser()"
        )
          include ../../common/assets/icons/block
        .unblock-item(
          v-if="isBlocked && !isLoggedUser"
          title="Разблокировать пользователя"
          @click.stop="unblockUser()"
        )
          include ../../common/assets/icons/unblock
        .remove-item(
            v-if="!isLoggedUser"
            title="Удалить пользователя"
            @click.stop="deleteUser()"
        )
          include ../../common/assets/icons/remove
        .edit-item(
          v-if="!isBlocked"
          title="Отредактировать пользователя"
          @click.stop="editUser()"
        )
          include ../../common/assets/icons/edit
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { Domain, User } from '../../services/api'
import { Prop, Component, Vue } from 'vue-property-decorator'

const UA = namespace('upAccounts')

@Component
export default class UserAccountItem extends Vue {
  @Prop() private account!: User
  @Prop() private isLoggedUser!: boolean
  @Prop() private domains!: Array<Domain>

  get isBlocked() {
    return this.account.blocked
  }

  private editUser() {
    this.$emit('edit-user')
  }

  private deleteUser() {
    this.$emit('delete-user')
  }

  private blockUser() {
    this.$emit('block-user')
  }

  private unblockUser() {
    this.$emit('unblock-user')
  }

  get domainType() {
    return this.domains.find( d => d.name === this.account.domain)?.type ?? ''
  }
}
</script>

<style lang="sass" scoped>
@import "../../common/assets/styles/table.sass"
.logged-user
  font-weight: bold

.blocked
  display: flex
  align-items: center
  margin-left: 5px
</style>
