<template lang="pug">
  .stub-view
    .stub-view__text-container
      .stub-view__content
        .stub-view__title
          span Бесплатная школа по обучению языку программирования С++
        .stub-view__description
          p Компания Специальный Технологический Центр открывает набор на обучение программированию на С++.
          p Сейчас у тебя есть возможность записаться на курс и пройти отборочное тестирование одним из первых!
          p Курс начнется в сентябре и продлится 2 месяца, после окончания курса ты получишь сертификат.
        //  p Программа и график обучения и будут направлены тебе на почту после регистрации и тестирования.
        //form.__form
        //  input(
        //    placeholder = "Почта"
        //    type = "text"
        //  )
        //  app-button.__button Оставить заявку
    .stub-view__image-container
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/AppButton.vue'

@Component({
  components: {
    AppButton,
  },
})
export default class StubView extends Vue{}
</script>

<style scoped lang="sass">
@import '../common/assets/common'
.stub-view
  width: 100%
  height: 100%
  display: flex
  &__text-container
    width: 45%
    height: 100%
    display: flex
    flex-direction: column
    align-items: flex-end
    justify-content: center
    padding-right: 100px
  &__content
    width: 53%
  &__title
    font: $header-text-style
  &__description
    font: $main-text-style
    line-height: 1.5
  &__form
    display: flex
    flex-direction: column
    input
      @include main-input
      width: 240px
      margin-top: 30px
      padding-bottom: 7px
  &__button
      width: 170px
      margin-top: 30px

  &__image-container
    width: 55%
    height: 100%
    background: #FAFAFB url("../../src/common/images/final-image.png") no-repeat center
    background-size: 85%
    border: 1px solid #E1E1E1
    box-sizing: border-box
    box-shadow: 0 4px 4px rgba(34, 36, 38, 0.08)

@media screen and (max-width: 1200px)
  .stub-view
    justify-content: center
    flex-direction: column
    &__text-container
      width: 100%
      justify-content: center
      padding: 0
      align-items: center
    &__content
        justify-content: center
        width: 80%
    &__image-container
      width: 100%
      background-size: 70%

@media screen and (max-width: 1200px)
  .stub-view
    &__image-container
      background-size: 90%
@media screen and (max-width: 380px)
  .stub-view
    &__title
      font-size: 30px

</style>
