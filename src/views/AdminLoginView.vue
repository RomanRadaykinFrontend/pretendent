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
import { authStore } from '../../packages/login-form'
@Component({
  components: { LoginForm },
})
export default class AdminLoginView extends Vue{
  public allowedPermits: Array<string> = [
    'ssi-proxy',
    'ssi_sources',
  ]

}
</script>

<style scoped lang="sass">

</style>
