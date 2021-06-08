<template lang="pug">
  .app-registration-wrapper
    .login
      login-form-view
    .blank
      blank-background-view
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import LoginFormView from '@/views/Registration/parts/LoginFormVIew.vue'
import BlankBackgroundView from '@/views/Registration/parts/BlankBackgroundView.vue'

@Component({
  components: {
    LoginFormView,
    BlankBackgroundView,
  },
})
export default class RegistrationView extends Vue {}

</script>

<style scoped lang="sass">
.app-registration-wrapper
  width: 100%
  height: 100%
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  position: relative

  .login
    width: 45%
    height: 100%
    display: flex
    justify-content: flex-end
    align-items: flex-start

  .blank
    width: 55%
    height: 100%

@media screen and (max-width: 1200px)
  .app-registration-wrapper
    justify-content: center
    .blank
      display: none

@media screen and (max-width: 800px)
  .app-registration-wrapper
    .login
      width: 70%
      justify-content: center

@media screen and (max-width: 600px)
  .app-registration-wrapper
    .login
      width: 100%
      justify-content: center
</style>
