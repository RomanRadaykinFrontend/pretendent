<template lang="pug">
  .registration-view
    .registration-view__login
      LoginFormView
    .registration-view__blank
      BlankBackgroundView
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
.registration-view
  width: 100%
  height: 100%
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  position: relative

  &__login
    width: 45%
    height: 100%
    display: flex
    justify-content: flex-end
    align-items: flex-start

  &__blank
    width: 55%
    height: 100%

@media screen and (max-width: 1200px)
  .registration-view
    justify-content: center
    &__blank
      display: none

@media screen and (max-width: 800px)
  .registration-view
    &__login
      width: 70%
      justify-content: center

@media screen and (max-width: 600px)
  .registration-view
    &__login
      width: 90%
      justify-content: center
</style>
