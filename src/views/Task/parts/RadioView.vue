<template lang="pug">
  form.form-radio(@submit.prevent = "onSubmitHandler")
    .radio-answer(
      v-for = "(value, index) in arrayOfValues"
      :key = "value"
    )
      div
        input.radio-button(
          type = "radio"
          :id = "index + 1"
          :value = "value"
          v-model = "picked"
        )
        label.radio-label(
          :for = "index + 1"
        ) {{ value }}
    .buttons-block
      app-button.button(
        :is-primary = "true"
      ) Далее
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import AppButton from '../../../components/AppButton.vue'
import { commonModule } from '@/store'
import { sendAnswers } from '@/helpers/functions'

@Component({
  components: {
    AppButton,
  },
})

export default class RadioView extends Vue {


  @Prop() private totalCount!: number
  @Prop() private arrayOfValues!: Array<string>
  @Prop() private questionNumber!: number

  private taskNumber = +this.$route.params.id

  // пушим в стейт выбранный вариант ответа и достаем по необходимости
  set picked( value: string ){
    commonModule.mutations.setCurrentAnswer({
      question: this.taskNumber,
      pickedValue: value,
    })
    commonModule.mutations.setDoneTaskList({
      taskNumber: this.taskNumber,
      value,
    })
  }
  get picked(){
    const currentValue = commonModule.getters.doneTaskList
      .find( item => item.taskNumber === this.taskNumber )
    if( currentValue ){
      return currentValue.value
    } else{
      return ''
    }
  }

  // хэндлер формы
  private onSubmitHandler() {
    sendAnswers( this.arrayOfValues )
    this.changePageHandler()
  }

  // хелпер по переключению страниц
  private changePageHandler() {
    if ( this.totalCount === +this.$route.params.id ) {
      commonModule.mutations.setIsModalWindowShowed( true )
    } else {
      localStorage.task = 1 + this.questionNumber
      this.$router.push({
        name: 'TaskView', params: {
          id: ( 1 + this.questionNumber ).toString(),
        },
      })
    }
  }

}

</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.form-radio

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

  .buttons-block
    display: flex
    .button
      cursor: pointer

@media screen and (max-width: 320px)
      .button
        width: 100%
        button
          width: 100%
</style>
