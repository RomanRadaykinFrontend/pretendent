<template lang="pug">
  .user-permissions-view
    AdminHeader(
      @click-button = "goToAdminPanel"
      button-name = "Вернуться в админ-панель"
    )
    UserPermissions(
      :permits = "permits"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserPermissions } from '../../packages/user-permissions'
import { UserPanel } from '../../packages/login-form'
import AdminHeader from '@/views/AdminHeader.vue'

@Component({
  components: { AdminHeader, UserPermissions, UserPanel },
})
export default class UserPermissionsView extends Vue{
  private permits = [{ alias: 'Аналитик', role: 'analyst' }]
  private logout(){
    window.localStorage.removeItem( 'token' )
  }
  private goToAdminPanel(){
    this.$router.push( '/adminpanel' )
  }
}
</script>

<style scoped lang="sass">

</style>
