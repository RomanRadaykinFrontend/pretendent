<template lang="pug">
  .user-permissions-view
    AdminHeader.user-permissions-view__header(
      @click-button = "goToAdminPanel"
      button-name = "Вернуться в админ-панель"
    )
    UserPermissions.user-permissions-view__user-perm(
      :permits = "permits"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserPermissions } from '../../packages/user-permissions'
import { UserPanel } from '../../packages/login-form'
import AdminHeader from '@/views/AdminHeader.vue'
import { Permission } from '../../packages/user-permissions/src/types/userpermissions'

@Component({
  components: { AdminHeader, UserPermissions, UserPanel },
})
export default class UserPermissionsView extends Vue{

  private permits: Array<Permission> = [
    { permit: 'secure_okauth_admin', alias: 'Администратор' },
    { permit: 'user', alias: 'Пользователь' },
  ]
  private goToAdminPanel(){
    this.$router.push( '/adminpanel' )
  }

}
</script>

<style scoped lang="sass">
.user-permissions-view
  padding-top: 30px
  &__user-perm
    margin-top: 15px
  &__header
    width: 63%
    margin: 0 auto

</style>
