<template lang="pug">
  div
    form.form-radio
      div.radio-answer(
        v-for="value in arrayOfValues"
        :key="value"
      )
        input.radio-button(
          type="radio"
          id="value"
          :value="value"
          v-model="picked"
        )
        label.radio-label(
          :for="value"
        ) {{ value }}
        input.another-answer(
          type="text"
          v-if="isNeedInput && value === anotherAnswer"
          v-model="textOfAnotherAnswer"
        )
      label.radio-warning(v-if="picked===''") Выберите ответ или пропустите вопрос
      div.buttons-block
        app-button(
          :is-primary="true"
          @button-action="click"
          ) Далее
        app-button(
          :is-primary="false"
          @button-action="click"
          ) Не знаю
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LoginFormInput from './LoginFormInput.vue'
import AppButton from './AppButton.vue'
import { FormData } from '../types/common'

@Component({
  components: {
    LoginFormInput, AppButton,
  },
})

export default class AppRadio extends Vue {
  public anotherAnswer = 'Другое'
  public textOfAnotherAnswer = ''
  public formRadioData = {} as FormData
  private picked = ''
  @Prop() private arrayOfValues!: Array<string>
  @Prop() private name!: string
  private isNeedInput = this.arrayOfValues.includes( this.anotherAnswer )

  public click(){
    this.formRadioData[this.name] = this.picked === '' ?
      this.formRadioData[this.name] = 'noAnswered' :
      this.formRadioData[this.name] = `${this.picked} ${this.textOfAnotherAnswer}`
  }
}

</script>

<style scoped lang="sass">
@import '../common/assets/common'
.form-radio
  margin: 10px 0

  .radio-button
    transform: scale(1.4)
    margin: 10px 10px 10px 0

  .radio-answer, .radio-label
    font: $answer-text-style

  .radio-answer
    display: flex
    align-items: center

    .another-answer
      margin-left: 15px
      @include main-input

  .radio-warning
    font: $main-text-style
    color: rgb(216, 44, 13)
    margin-top: 30px

  .buttons-block
    display: flex
</style>
