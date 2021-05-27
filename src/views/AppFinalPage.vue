<template lang="pug">
  .page-wrapper
    .image-wrapper
    .message-wrapper
      span.message-header Ваши ответы записаны ожидайте решения
      span.message-text Теперь можно покинуть страницу, обычно отвечаем за 7 дней
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppFinalPage extends Vue {

}

</script>

<style scoped lang="sass">
@import '../common/assets/common'
.page-wrapper
  display: flex
  flex-direction: column
  padding: 6px 0
  margin: 0 auto
  width: 50%
  height: 100%
  justify-content: center

  .image-wrapper
    width: 100%
    height: 60%
    background: url("../common/images/baloons.png") no-repeat center

  .message-wrapper
    width: 100%
    height: 20%
    text-align: center
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    .message-header
      font: $header-text-style
      width: 60%
      line-height: 1.2
      margin-top: 15px

    .message-text
      width: 30%
      text-align: center
      font: $main-text-style
      margin-top: 30px
      line-height: 1.5

@media screen and (max-width: 1350px)
  .page-wrapper
    width: 60%

@media screen and (max-width: 1150px)
  .page-wrapper
    width: 70%

@media screen and (max-width: 970px)
  .page-wrapper
    margin: 0
    width: 100%

@media screen and (max-width: 700px)
  .page-wrapper
    .image-wrapper
      background-size: contain
      height: 40%
    .message-wrapper
      .message-header
        font-size: 30px
        width: 90%
      .message-text
        font-size: 14px
        width: 90%

</style>
