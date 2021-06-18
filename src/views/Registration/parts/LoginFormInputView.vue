<template lang="pug">
  .login-form-input-wrapper
    label.login-form-label(v-if = "value !== ''") {{ placeholder }}
    input.login-form-input(
      type="text"
      :placeholder = "placeholder"
      :name = "name"
      v-model = "value"
      @focus = "isFocused = 'focused'; focusCount +=1"
      @blur = "isFocused = 'blur'"
      @input = "changeUserInfo([ name, value ])"
      :style = "borderColorStyle"
      :key="name"
    )
    .login-form-error(
      v-show = "doValidate === 'incorrectName'"
    ) Только буквы русского алфавита, минимум 2 символа
    .login-form-error(
      v-show = "doValidate === 'empty'"
      ) Это поле обязательно
    .login-form-error(
      v-show = "doValidate === 'incorrectMail'"
      ) Почта указана неверно
    .login-form-error(
      v-show = "doValidate === 'incorrectTelegram'"
      ) Формат: "@***", только латинские буквы
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { regExpEmail, regExpTelegram, regExpName, regExpTelegramOnChange } from '@/common/regexp/regexp'
import { commonModule } from '@/store'
import { InputName } from '@/types/common'

@Component

export default class LoginFormInputView extends Vue {

  @Prop() private name!: InputName
  @Prop({ required: false }) private placeholder!: string

  private isFocused = 'default'
  private focusCount = 0
  private borderColorStyle = { 'border-color': 'rgb( 225, 225, 225 )' }

  private value = ''

  private changeUserInfo( data: [InputName, string]){
    // if( this.name === 'telegram' ){
    //   const lastLetter = this.value[this.value.length - 1]
    //   this.value = regExpTelegramOnChange.test( lastLetter ) ?
    //     this.value :
    //     this.value.split( '' ).splice( 0, this.value.length - 1 ).join( '' )
    // }
    commonModule.mutations.setUser( data )
  }

  get isIncorrectFormData(){
    return commonModule.getters.isIncorrectFormData
  }

  // валидация и регулирование тултипа
  get doValidate() {
    if ( this.isIncorrectFormData ) {
      switch ( this.name ) {
      case 'name':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpName.test( this.value ) ){
          return 'incorrectName'
        } else {
          return false
        }
      case 'lastName':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpName.test( this.value ) ){
          return 'incorrectName'
        } else {
          return false
        }
      case 'email':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpEmail.test( this.value ) ){
          return 'incorrectMail'
        } else {
          return false
        }
      case 'telegram':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpTelegram.test( this.value ) ){
          return 'incorrectTelegram'
        } else {
          return false
        }
      }
      commonModule.mutations.setIsIncorrectFormData( false )
    }
    if( this.focusCount >= 1 ){
      switch ( this.name ) {
      case 'name':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpName.test( this.value ) ){
          return 'incorrectName'
        } else {
          return false
        }
      case 'lastName':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpName.test( this.value ) ){
          return 'incorrectName'
        } else {
          return false
        }
      case 'email':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpEmail.test( this.value ) ){
          return 'incorrectMail'
        } else {
          return false
        }
      case 'telegram':
        if ( this.value === '' ) {
          return 'empty'
        } else if( !regExpTelegram.test( this.value ) ){
          return 'incorrectTelegram'
        } else {
          return false
        }
      }
    }
    return false
  }

  // валидация  и изменение цвета бордера
  @Watch( 'value' )
  private onValueChangedHandler() {
    commonModule.mutations.setIsIncorrectFormData( false )
    // this.borderColorStyle['border-color'] =  this.value === ''  ? 'blue' : 'red'
    switch ( this.name ) {
    case 'email': {
      const val = regExpEmail.test( this.value )
      this.borderColorStyle['border-color'] = val ? 'blue' : 'red'
      break
    }
    case 'telegram':
      this.borderColorStyle['border-color'] = regExpTelegram.test( this.value ) ? 'blue' : 'red'
      break
    default:
      this.borderColorStyle['border-color'] = regExpName.test( this.value ) ? 'blue' : 'red'
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
    left: 110%
    width: 140px
    padding: 10px 15px
    bottom: 5px

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
      top: 35%

@media screen and (max-width: 1700px)
  .login-form-input-wrapper
    .login-form-error
      color: red
      padding: 0
      border: none
      bottom: -15px
      width: 100%
      text-align: end
      left: 0
      &:before
        display: none
</style>
