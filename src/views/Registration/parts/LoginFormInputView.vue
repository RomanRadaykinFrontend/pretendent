<template lang="pug">
  .login-form-input-wrapper
    label.login-form-label(v-if = "value !== ''") {{ placeholder }}
    input.login-form-input(
      type="text"
      :placeholder = "placeholder"
      :name = "name"
      v-model.trim = "value"
      @change = "$emit('get-text', [name, value])"
      @focus = "isFocused = true"
      @blur = "isFocused = false"
      :style = "borderColorStyle"
    )
    .login-form-error(
      v-if = " nameErrorIsShowed "
      ) Это поле обязательно
    .login-form-error(
      v-if = "emailErrorIsShowed "
      ) Почта указана неверно
    .login-form-error(
      v-if = "telegramErrorIsShowed "
      ) Формат: "@****"
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { regExpEmail } from '@/common/regexp/regexp'
import { commonModule } from '@/store'

@Component

export default class LoginFormInputView extends Vue {



  public borderColorStyle = { 'border-color': 'rgb( 225, 225, 225 )' }

  private value = ''
  private isFocused = true
  private isEmptyField = false
  private isInvalidEmailField = false
  private isInvalidTelegramField = false


  get isIncorrectFormData(){
    return commonModule.getters.isIncorrectFormData
  }

  @Prop() private name!: string
  @Prop({ required: false }) private placeholder!: string

  get telegramErrorIsShowed(){
    return ( this.value !== '' && this.name === 'telegram'
      && !this.isInvalidTelegramField && this.isFocused )
      || ( this.name === 'telegram' && this.isIncorrectFormData && !this.isInvalidTelegramField )
  }

  get emailErrorIsShowed(){
    return ( this.value!== '' && this.name === 'email'
      && !this.isInvalidEmailField && this.isFocused ) ||
      ( this.name === 'email' && !this.isInvalidEmailField && this.isIncorrectFormData )
  }

  get nameErrorIsShowed(){
    return ( this.isEmptyField && this.isFocused ) ||
      ( ( this.name === 'name' || this.name === 'lastName' ) && this.isIncorrectFormData && this.value === '' )
  }


  // Когда уходит фокус с инпута, запускается валидация
  @Watch( 'isFocused' )
  public onValueChangedHandler() {
    commonModule.mutations.setIsIncorrectFormData( false )
    this.isEmptyField = this.value === ''
    this.borderColorStyle['border-color'] = this.value === '' ? 'red' : 'blue'
    switch ( this.name ) {
    case 'email':
      this.isInvalidEmailField = regExpEmail.test( this.value )
      this.borderColorStyle['border-color'] = !this.isEmptyField ? 'red' : 'blue'
      this.borderColorStyle['border-color'] = this.isInvalidEmailField ? 'blue' : 'red'
      break
    case 'telegram':
      this.isInvalidTelegramField = /^@/.test( this.value )
      this.borderColorStyle['border-color'] = !this.isEmptyField ? 'red' : 'blue'
      this.borderColorStyle['border-color'] = this.isInvalidTelegramField ? 'blue' : 'red'
      break
    }
  }
}
</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.login-form-input-wrapper
  display: flex
  flex-direction: column
  margin-top: 30px
  position: relative

  .login-form-label
    color: rgb(128, 128, 128)
    font: normal 10px Roboto, serif
    position: absolute
    top: -7px

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
