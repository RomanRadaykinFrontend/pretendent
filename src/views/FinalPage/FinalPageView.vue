<template lang="pug">
  .final-page-view
    .final-page-view__image-wrapper
    .final-page-view__message-wrapper
      span.final-page-view__message-header Спасибо за ответы.
      span.final-page-view__message-text Наш специалист свяжется с вами.
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { commonModule } from '@/store'

@Component
export default class FinalPageView extends Vue {
  private mounted(){
    localStorage.setItem( 'answers', JSON.stringify([]) )
    localStorage.setItem( 'timeStart', '' )
    localStorage.setItem( 'doneTaskList', JSON.stringify([]) )
    localStorage.setItem( 'userGUID', '' )
    localStorage.setItem( 'isAuthorized', 'false' )
    commonModule.mutations.setDoneTaskListLocalStorage([])
    commonModule.mutations.setTimer( commonModule.getters.timer )
  }
}

</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.final-page-view
  display: flex
  flex-direction: column
  padding: 6px 0
  margin: 0 auto
  width: 100%
  height: 100vh
  justify-content: center
  box-sizing: border-box

  &__image-wrapper
    width: 100%
    height: 60%
    background: url("../../common/images/baloons.png") no-repeat center
    background-size: auto

  &__message-wrapper
    width: 100%
    height: 20%
    text-align: center
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  &__message-header
    font: $header-text-style
    width: 60%
    line-height: 1.2
    margin-top: 15px

  &__message-text
    width: 30%
    text-align: center
    font: $main-text-style
    margin-top: 30px
    line-height: 1.5

@media screen and (max-width: 768px)
  .final-page-view
    justify-content: flex-start
    &__image-wrapper
      background-size: contain

@media screen and (max-width: 560px)
  .final-page-view
    &__message-header
      font-size: 30px
      width: 90%
      margin-top: 5px
    &__message-text
      font-size: 15px
      width: 90%
      margin-top: 10px

</style>
