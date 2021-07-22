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
  background: #DBE4FF
  padding: 70px 120px
  box-sizing: border-box

  &__login
    width: 50%
    height: 100%
    display: flex
    align-items: flex-start
    background: white
    border-radius: 24px 0px 0px 24px
    padding-left: 120px
    position: relative
    box-sizing: border-box

  &__blank
    width: 50%
    height: 100%
    background: white
    box-sizing: border-box
    border-radius: 0px 24px 24px 0px

@media screen and (max-width: 1200px)
  .registration-view
    justify-content: center
    padding: 30px
    height: auto
    &__blank
      display: none
    &__login
      width: 70%
      height: auto
      justify-content: center
      border-radius: 24px
      padding: 25px

@media screen and (max-width: 600px)
  .registration-view
    &__login
      width: 100%
      justify-content: center
      padding: 10px
</style>
