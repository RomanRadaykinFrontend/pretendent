<template lang="pug">
  .message(
    :class="getMsgClassName"
  )
    .message__text {{ messageText }}
    .message__close(
      v-if="showCloseButton"
      @click="close"
    ) x

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { InfoMessage } from './../../types/common'
@Component
export  default class AppMessage extends Vue {

  get getMsgClassName() {
    switch ( this.message?.type ) {
    case 'info':
      return 'info'
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    default:
      return ''
  }
  }
  @Prop() private message!: InfoMessage
  @Prop({ default: true }) private showCloseButton!: boolean

  private close() {
    this.$emit('close')
  }

  get messageText() {
    return this.message?.text ?? ''
  }
}
</script>
<style lang="sass" scoped>
  .message
    font-family: Roboto
    font-weight: 400
    font-size: 14px
    color: #313a55
    height: 30px
    border-radius: 3px
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 10px
    &.error
      background-color: #FFD3D3
    &.success
      background-color: #c7fad8
    &.info
      background-color: #209cee
    &.warn
      background-color: #ffdd57
    &__close
      cursor: pointer
      font-size: 25px
      transform: scaleY(0.8) scaleX(1.2)
</style>
