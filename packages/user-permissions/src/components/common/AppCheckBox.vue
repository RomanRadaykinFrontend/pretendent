<template lang="pug">
  .app-checkbox
    label(
      :class="labelClass"
      )
      input(
        type="checkbox"
        v-model="model"
        )
      span.checkmark
      slot.content
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppCheckBox extends Vue {
  @Prop() public value!: boolean
  @Prop() public disabled!: boolean
  @Prop({ default: 'checkbox' }) public inputStyle!: string

  get model() {
    return this.value
  }

  set model( val ) {
    this.$emit( 'input', val )
    this.$emit( 'change', val )
  }

  get labelClass(): object {
    return {
      disabled: this.disabled,
      checkbox: this.inputStyle === 'checkbox',
      radiobutton: this.inputStyle === 'radiobutton',
    }
  }
}
</script>

<style lang="sass" scoped>
.app-checkbox
  display: block
  position: relative
  padding-left: 14px
  height: 14px
  label
    padding-left: 5px
    cursor: pointer

  input
    position: absolute
    opacity: 0
    height: 0
    width: 0

  &.disabled
    pointer-events: none
    color: silver

  .checkmark
    border: solid 1px #bcc2df
    position: absolute
    top: 0
    left: 0
    height: 14px
    width: 14px
    background-color: #dadfeb
    border-radius: 2px
    cursor: pointer

    &:after
      content: ""
      position: absolute
      display: none


  &:hover input ~ .checkmark
    background-color: #ccc


  input:checked ~ .checkmark:after
    display: block

  .checkmark:after
    left: 4px
    top: -4px
    width: 5px
    height: 10px
    border-radius: 2px
    border: solid #252e45
    border-width: 0 3px 3px 0
    transform: rotate(45deg)

.radiobutton
  display: block
  position: relative
  padding-left: 14px
  user-select: none
  height: 14px

  input
    position: absolute
    opacity: 0
    height: 0
    width: 0

  &.disabled
    pointer-events: none
    color: silver
    .checkmark
      background: #D1D5E0

  .checkmark
    border: solid 1px #bcc2df
    position: absolute
    top: 0
    left: 0
    height: 16px
    width: 16px
    background-color: #dadfeb
    border-radius: 8px
    cursor: pointer
    &:after
      content: ""
      position: absolute
      display: none


  &:hover input ~ .checkmark
    background-color: #ccc


  input:checked ~ .checkmark:after
    display: block

  .checkmark:after
    left: 2px
    top: 2px
    width: 5px
    height: 5px
    border-radius: 18px
    border: 5px solid #252e45
    box-sizing: border-box
    background: #252e45

</style>
