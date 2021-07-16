<template lang="pug">
  LoginForm(
    systemName="Претендент"
    pathAfterLogon="/adminpanel"
    :allowedPermits="allowedPermits"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginForm from '../../packages/login-form/src/auth/components/LoginForm.vue'
@Component({
  components: { LoginForm },
})
export default class AdminLoginView extends Vue{
  public allowedPermits: Array<string> = [
    'secure_okauth_admin', 'user',
  ]

}
</script>

<style scoped lang="sass">

</style>
