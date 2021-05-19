<template lang="pug">
  div.page-wrapper
    div.image-wrapper
    div.message-wrapper
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
    background-image: url("../common/images/baloons.png")
    background-repeat: no-repeat
    background-position: center

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

</style>
