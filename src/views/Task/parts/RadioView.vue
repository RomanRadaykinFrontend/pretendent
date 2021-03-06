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
      )
        |Далее
        ArrayForwardLogo.logo
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import AppButton from '../../../components/AppButton.vue'
import { testingModule } from '@/store'
import { sendAnswers } from '@/helpers/functions'
import ArrayForwardLogo from '@/common/images/array-forward.svg'
import { Questions } from '@/services/api'

@Component({
  components: {
    AppButton, ArrayForwardLogo,
  },
})

export default class RadioView extends Vue {


  @Prop() private totalCount!: number
  @Prop() private arrayOfValues!: Array<string>
  @Prop() private questionNumber!: number

  private doneTasksCount = testingModule.getters.doneTaskList.length

  // пушим в стейт выбранный вариант ответа и достаем по необходимости
  set picked( value: string ){
    testingModule.mutations.setCurrentAnswer({
      question: this.questionNumber,
      pickedValue: value,
    })
    testingModule.mutations.setDoneTaskList({
      taskNumber: this.questionNumber,
      value,
    })
  }
  get picked(){
    const currentValue = testingModule.getters.doneTaskList
      .find( item => item.taskNumber === this.questionNumber )
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
      testingModule.mutations.setIsModalWindowShowed( true )
    } else if( +this.$route.params.id === this.totalCount && this.totalCount === this.doneTasksCount ){
      this.$router.push( '/final' )
    } else {
      localStorage.task = 1 + +this.$route.params.id
      this.$router.push({
        name: 'TaskView', params: {
          id: ( 1 + +this.$route.params.id ).toString(),
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
    margin: 5px 0 0 5px

    &:hover:before
      border-color: #4D64AA

    &:before
      width: 10px
      height: 10px
      border-radius: 10px
      top: -1px
      left: -1px
      position: relative
      background-color: white
      content: ''
      display: inline-block
      visibility: visible
      border: 2px solid #8C9196

    &:checked
      &:before
        width: 10px
        height: 10px
        border-radius: 12px
        top: -1px
        left: -1px
        position: relative
        background-color: white
        content: ''
        display: inline-block
        visibility: visible
        border: 2px solid #4D64AA

    &:checked
      &:after
        width: 8px
        height: 8px
        border-radius: 15px
        bottom: 150%
        left: 14%
        position: relative
        background-color: #4D64AA
        content: ''
        display: inline-block
        visibility: visible

  &__answer, &__label
    font: $answer-text-style

  &__answer
    margin-top: 15px

    &:nth-child(1)
      margin-top: 0

  &__label
    line-height: 1.5
    margin-left: 10px
  &__button-wrapper
    display: flex
    align-items: flex-start

  &__buttons-block
    display: flex

  &__button
    cursor: pointer
    border-radius: 5px
    .logo
      margin-left: 15px

@media screen and (max-width: 479px)
  .radio-view
    &__button-wrapper
      padding-left: 5px
    &__button
      width: 100%
      border-radius: 0px 0px 5px 5px
      button
        width: 100%
    &__answer
      padding-left: 12px
</style>
