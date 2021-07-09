<template lang="pug">
  .login-form-input-view
    label.login-form-input-view__label(v-if = "value !== ''") {{ placeholder }}
    input.login-form-input-view__input(
      type="text"
      :placeholder = "placeholder"
      :name = "name"
      v-model.trim = "value"
      @focus = "isFocused = 'focused'; focusCount +=1"
      @blur = "isFocused = 'blur'"
      @input = "changeUserInfo([ name, value ])"
      :style = "borderColorStyle"
      :key="name"
    )
    .login-form-input-view__error(
      v-show = "doValidate === 'incorrectName'"
    ) Буквы русского алфавита, от 2 символов
    .login-form-input-view__error(
      v-show = "doValidate === 'empty'"
      ) Это поле обязательно
    .login-form-input-view__error(
      v-show = "doValidate === 'incorrectMail'"
      ) Почта указана неверно
    .login-form-input-view__error(
      v-show = "doValidate === 'incorrectTelegram'"
      ) Латинские буквы, 5-32 символа, @*****
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { regExpEmail, regExpTelegram, regExpName } from '@/common/regexp/regexp'
import { testingModule } from '@/store'
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
    testingModule.mutations.setUser( data )
  }

  get isIncorrectFormData(){
    return testingModule.getters.isIncorrectFormData
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
        if( !regExpTelegram.test( this.value ) && this.value !== '' ){
          return 'incorrectTelegram'
        } else {
          return false
        }
      }
      testingModule.mutations.setIsIncorrectFormData( false )
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
        if( !regExpTelegram.test( this.value ) && this.value !== '' ){
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
    testingModule.mutations.setIsIncorrectFormData( false )
    // this.borderColorStyle['border-color'] =  this.value === ''  ? 'blue' : 'red'
    switch ( this.name ) {
    case 'email': {
      const val = regExpEmail.test( this.value )
      this.borderColorStyle['border-color'] = val ? 'blue' : 'red'
      break
    }
    case 'telegram':
      this.borderColorStyle['border-color'] = regExpTelegram.test( this.value ) ? 'blue' : 'red'
      if( this.value === '' ) {
        this.borderColorStyle['border-color'] = 'rgb(225, 225, 225)'
      }
      break
    default:
      this.borderColorStyle['border-color'] = regExpName.test( this.value ) ? 'blue' : 'red'
    }
  }
}
</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.login-form-input-view
  display: flex
  flex-direction: column
  margin-top: 30px
  position: relative

  &__label
    color: rgb(128, 128, 128)
    font: normal 10px Roboto, serif
    position: absolute
    top: -7px

  &__input
    width: 240px
    height: 40px
    border: none
    font-size: $main-font-size
    border-bottom: solid 1px $secondary-color
    outline: none
    font: $main-text-style

  &__error
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
  .login-form-input-view
    &__error
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
