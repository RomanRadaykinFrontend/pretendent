<template lang="pug">
  .modal-window
    .text-message
      .__text
        span Закончить тест и отправить результаты?
      .__buttons
        button.__button.__secondary(
          :is-primary = "false"
          @click.prevent="$emit('close-modal')"
        ) Отмена
        button.__button.__primary(
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
  justify-content: center
  align-items: center

  .text-message
    width: 738px
    left: 591px
    top: 410px
    border-radius: 8px
    padding: 25px
    background: white

    .__text
      font-family: Jost, serif
      color: black
      font-weight: bold
      font-size: 36px
      text-align: center

    .__buttons
      display: flex
      justify-content: flex-end

      .__button
        border: none
        height: 40px
        padding: 3px 20px
        margin-top: 30px
        border-radius: 5px
        font-size: 16px
        cursor: pointer
        font: $main-text-style

      .__secondary
        margin-right: 10px
        background-color: white
        color: $primary-color
        border: 1px solid $primary-color

      .__primary
        background-color: $primary-color
        color: white
</style>
