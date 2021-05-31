<template lang="pug">
  .login-form-input-wrapper
    label.login-form-label(v-if = "value !== ''") {{ placeholder }}
    input.login-form-input(
      type="text"
      :placeholder = "placeholder"
      :name = "name"
      v-model.trim = "value"
      @change = "$emit('get-text', [name, value])"
      @focus = "isChecked = true"
      @blur = "isChecked = false"
      :style = "borderColorStyle"
    )
    .login-form-error( v-if = "isEmptyField && isChecked" ) Это поле обязательно
    .login-form-error( v-if = "isInvalidEmailField && isChecked" ) Почта указана неверно
    .login-form-error( v-if = "isInvalidTelegramField && isChecked" ) Необходимый формат: "@****"
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { regExpEmail } from '@/common/regexp/regexp'

@Component

export default class LoginFormInputView extends Vue {

  public borderColorStyle = { 'border-color': 'rgb( 225, 225, 225 )' }

  private value = ''
  private isChecked = true
  private isEmptyField = false
  private isInvalidEmailField = false
  private isInvalidTelegramField = false

  @Prop() private name!: string
  @Prop({ required: false }) private placeholder!: string

  // Когда уходит фокус с инпута, запускается валидация
  @Watch( 'isChecked' )
  public onValueChangedHandler() {
    this.borderColorStyle['border-color'] = this.value === '' ? 'red' : 'blue'

    switch ( this.name ) {
    case 'email':
      this.isEmptyField = this.value === ''
      this.isInvalidEmailField = this.value !== '' && !regExpEmail.test( this.value )
      this.borderColorStyle['border-color'] = this.isEmptyField || this.isInvalidEmailField ? 'red' : 'blue'
      break
    case 'name':
      this.isEmptyField = this.value === ''
      break
    case 'lastName':
      this.isEmptyField = this.value === ''
      break
    case 'telegram':
      this.isEmptyField = this.value === ''
      this.isInvalidTelegramField = this.value !== '' && !/^@/.test( this.value )
      this.borderColorStyle['border-color'] = this.isEmptyField || this.isInvalidTelegramField ? 'red' : 'blue'
      break
    }
  }
}
</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.login-form-input-wrapper
  display: flex
  flex-direction: column
  margin-top: 30px
  position: relative

  .login-form-label
    color: rgb(128, 128, 128)
    font: normal 10px Roboto, serif

  .login-form-input
    width: 240px
    height: 40px
    border: none
    font-size: $main-font-size
    border-bottom: solid 1px $secondary-color
    outline: none
    font: $main-text-style

  .login-form-error
    font: normal 12px Roboto, serif
    border: 1px solid $secondary-color
    border-radius: 5px
    position: absolute
    right: -180px
    padding: 15px

    &:before
      content: ''
      position: absolute
      border: 10px solid transparent
      border-right: 10px solid $secondary-color
      left: -20px
      top: 30%
@media screen and (max-width: 1700px)
  .login-form-input-wrapper
    .login-form-error
      color: red
      padding: 0
      border: none
      right: 0
      bottom: -15px
      &:before
        display: none
</style>
