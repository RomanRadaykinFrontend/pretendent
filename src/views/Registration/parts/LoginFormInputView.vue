<template lang="pug">
  .login-form-input-wrapper
    label.login-form-label(v-if = "value !== ''") {{ placeholder }}
    input.login-form-input(
      type="text"
      :placeholder = "placeholder"
      :name = "name"
      v-model = "value"
      @input = "changeUserInfo([name, value])"
      @focus = "isFocused = 'focus'; focusCount +=1"
      @blur = "isFocused = 'blur'"
      :style = "borderColorStyle"
      :key="name"
    )
    .login-form-error(
      v-if = " doValidate === 'empty' "
      ) Это поле обязательно
    .login-form-error(
      v-if = "doValidate === 'incorrectMail' "
      ) Почта указана неверно
    .login-form-error(
      v-if = "doValidate === 'incorrectTelegram'"
      ) Формат: "@***"
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { regExpEmail, regExpTelegram } from '@/common/regexp/regexp'
import { commonModule } from '@/store'
import { InputName } from '@/types/common'

@Component

export default class LoginFormInputView extends Vue {


  public borderColorStyle = { 'border-color': 'rgb( 225, 225, 225 )' }

  private value = ''
  private isFocused = 'default'
  private focusCount = 0

  private changeUserInfo( data: [InputName, string]){
    commonModule.mutations.setUser( data )
  }
  get isIncorrectFormData(){
    return commonModule.getters.isIncorrectFormData
  }


  @Prop() private name!: InputName
  @Prop({ required: false }) private placeholder!: string

  get doValidate() {
    if ( this.isIncorrectFormData ) {
      switch ( this.name ) {
      case 'name':
        if( this.value === '' ){
          return 'empty'
        } else {
          return false
        }
      case 'lastName':
        if( this.value === '' ){
          return 'empty'
        } else {
          return false
        }
      case 'email':
        if( !regExpEmail.test( this.value ) ){
          return 'incorrectMail'
        } else {
          return false
        }

      case 'telegram':
        if( !regExpTelegram.test( this.value ) ){
          return 'incorrectTelegram'
        } else {
          return false
        }
      }
      commonModule.mutations.setIsIncorrectFormData( false )
    }
    if( this.isFocused === 'focus' && this.focusCount > 1 ){
      switch ( this.name ) {
      case 'name':
        if( this.value === '' ){
          return 'empty'
        } else {
          return false
        }
      case 'lastName':
        if( this.value === '' ){
          return 'empty'
        } else {
          return false
        }
      case 'email':
        if( !regExpEmail.test( this.value ) ){
          return 'incorrectMail'
        } else {
          return false
        }

      case 'telegram':
        if( !regExpTelegram.test( this.value ) ){
          return 'incorrectTelegram'
        } else {
          return false
        }
      }
    }
    return false
  }


  // Когда уходит фокус с инпута, запускается валидация
  @Watch( 'isFocused' )
  public onValueChangedHandler() {
    commonModule.mutations.setIsIncorrectFormData( false )
    this.borderColorStyle['border-color'] = this.value === '' ? 'red' : 'blue'
    switch ( this.name ) {
    case 'email':
      this.borderColorStyle['border-color'] = !( this.value === '' ) ? 'red' : 'blue'
      this.borderColorStyle['border-color'] = regExpEmail.test( this.value ) ? 'blue' : 'red'
      break
    case 'telegram':
      this.borderColorStyle['border-color'] = !( this.value === '' ) ? 'red' : 'blue'
      this.borderColorStyle['border-color'] = regExpTelegram.test( this.value ) ? 'blue' : 'red'
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
      width: 10px
      height: 10px
      position: absolute
      border-left: 1px solid $secondary-color
      border-top: 1px solid $secondary-color
      background: #FFF
      transform: rotate( -45deg )
      left: -7px

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
