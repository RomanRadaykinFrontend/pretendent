<template lang="pug">
  div.login-form-input-wrapper
    label.login-form-label(v-if="value !== ''") {{ placeholder }}
    input.login-form-input(
      type="text"
      :placeholder="placeholder"
      :name="name"
      v-model.trim="value"
      @change="$emit('get-text', [name, value])"
      :pattern="emailValidate"
      @focus="isChecked = true"
      @blur="isChecked = false"
      :style="borderColorStyle"
    )
    div.login-form-error( v-if="isError" ) Неверный адрес почты
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { regExpEmail } from '../common/regexp/regexp'

@Component

export default class LoginFormInput extends Vue {

  public emailValidate = regExpEmail
  public borderColorStyle = { 'border-color': 'rgb( 225, 225, 225 )' }


  private value = ''
  private isChecked = true
  private isError = false

  @Prop() private name!: string
  @Prop({ required: false }) private placeholder!: string

  @Watch( 'isChecked' )
  public onValueChangedHandler() {
    this.borderColorStyle['border-color'] = this.value === '' ? 'red' : 'blue'

    if ( this.name === 'email' && this.value !== '' ) {
      this.isError = !this.emailValidate.test( this.value )
      // console.log( this.emailValidate )
      this.borderColorStyle['border-color'] = this.isError ? 'red' : 'blue'
    }
    if ( this.name === 'telegram' ) {
      this.borderColorStyle['border-color'] = 'rgb(225, 225, 225)'
      if ( this.value !== '' ) {
        this.borderColorStyle['border-color'] = 'blue'
      }
    }
  }
}
</script>

<style scoped lang="sass">
@import '../common/assets/common'
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

</style>
