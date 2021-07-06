<template lang="pug">
  form.radio-view(@submit.prevent = "onSubmitHandler")
    .radio-view__answer(
      v-for = "(value, index) in arrayOfValues"
      :key = "value"
    )
      .radio-view__button-wrapper
        input.radio-view__radio-button(
          type = "radio"
          :id = "index + 1"
          :value = "value"
          v-model = "picked"
        )
        label.radio-view__label(
          :for = "index + 1"
        ) {{ value }}
    .radio-view__buttons-block
      AppButton.radio-view__button(
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
  private doneTasksCount = commonModule.getters.doneTaskList.length

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

  // если мы на 44 вовпросе - модалка "закончить тест", если нет - следующая таска
  private changePageHandler() {
    if ( +this.$route.params.id === this.totalCount && this.totalCount !== this.doneTasksCount ) {
      commonModule.mutations.setIsModalWindowShowed( true )
    } else if( +this.$route.params.id === this.totalCount && this.totalCount === this.doneTasksCount ){
      this.$router.push( '/final' )
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
.radio-view

  &__radio-button
    transform: scale(1.4)
    margin: 10px 10px 10px 0

  &__answer, &__label
    font: $answer-text-style

  &__answer
    display: flex
    align-items: center

  &__buttons-block
    display: flex
    .button
      cursor: pointer

@media screen and (max-width: 479px)
  .radio-view
    &__button-wrapper
      padding-left: 5px
    &__button
      width: 100%
      button
        width: 100%
</style>
