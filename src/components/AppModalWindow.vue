<template lang="pug">
  .modal-window
      .modal-window__text-message(
        ref = "textMessage"
        :style = "marginStyle"
      )
        .modal-window__text
          span Закончить тест и отправить результаты?
        .modal-window__buttons
          button.modal-window__button.modal-window__secondary(
            :is-primary = "false"
            @click.prevent="$emit('close-modal')"
          ) Отмена
          button.modal-window__button.modal-window__primary(
            @click.prevent="$emit('end-test')"
          ) Закончить
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/AppButton.vue'

@Component({
  components: { AppButton },
})
export default class AppModalWindow extends Vue {

  $refs!: {
    textMessage: HTMLDivElement
  }

  private marginStyle = {}

  private mounted(){
    this.marginStyle = {
      marginTop: `${ window.pageYOffset + this.$refs.textMessage.clientHeight }px`,
    }
  }

}
</script>

<style scoped lang="sass">
@import '../common/assets/common'
.modal-window
  position: absolute
  width: 100%
  height: 100%
  top: 0
  background: rgba(0, 0, 0, 0.5)
  display: flex
  flex-direction: column
  align-items: center

  &__text-message
    height: auto
    padding: 45px
    border-radius: 8px
    background: white


  &__text
    font-family: Jost, serif
    color: black
    font-weight: 500
    font-size: 36px
    align-self: self-start

  &__buttons
    display: flex
    justify-content: flex-end

  &__button
    border: none
    height: 40px
    padding: 3px 20px
    margin-top: 30px
    border-radius: 5px
    font-size: 16px
    cursor: pointer
    font: $main-text-style

  &__secondary
    margin-right: 10px
    background-color: white
    color: $primary-color
    border: 1px solid $primary-color

  &__primary
    background-color: $primary-color
    color: white

@media screen and (max-width: 767px)
  .modal-window
    &__text-message
      width: 80%
      box-sizing: border-box
      padding: 20px
@media screen and (max-width: 520px)
  .modal-window
    &__text
      font-size: 25px
    &__button
      padding: 3px 15px
      margin-top: 20px
      border-radius: 5px
      font-size: 12px
@media screen and (max-width: 520px)
  .modal-window
    &__text
      font-size: 20px
</style>
