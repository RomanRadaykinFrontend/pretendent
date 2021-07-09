<template lang="pug">
.table-cell-answ
  .table-cell-answ__task-number( v-show = " type === 'number' " )
    span {{ actualValue }}
  .table-cell-answ__text-code( v-show = " type === 'task' " )
    span {{ actualValue }}
    Highlight( v-show = " showCode " ) {{ actualCode }}
  .table-cell-answ__radio(
    v-show = " type === 'answersArr' "
    v-for = "(answer, index) in actualValue"
  )
    .radio-div(
      :key = "'answer' + index"
      :class = " styleSelectedAnsw( index ) "
    )
    label(
      :key = "'textAnswer' + index"
    ) {{ answer }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import hljs from 'highlight.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Highlight from 'vue-highlight-component'
import { Answer, CorrectAnswer } from '@/services/api'

// eslint-disable-next-line @typescript-eslint/no-var-requires
hljs.registerLanguage( 'cpp', require( 'highlight.js/lib/languages/cpp' ) )

@Component({
  components: {
    Highlight,
  },
})
export default class TableCellAnsw extends Vue{
  @Prop() private value!: string | number | Array<string>
  @Prop() private type!: 'number' | 'task' | 'answersArr'
  @Prop({ required: false }) private code!: string
  @Prop({ required: false }) private userAnswer!: Answer
  @Prop() private rightAnswer!: CorrectAnswer

  get actualCode(){
    return this.code
  }

  get actualValue(){
    return this.value
  }

  get showCode(){
    return this.actualCode !== ''
  }

  get taskIsDone(){
    return this.actualUserAnswer === this.actualRightAnswer
  }

  get actualRightAnswer(){
    if( this.rightAnswer ){
      return this.rightAnswer.answers[0]
    }
    return 0
  }

  get actualUserAnswer(){
    if( this.userAnswer ){
      return this.userAnswer.answer
    }
    return 0
  }

  // получаем класс радио-кнопок в зависимости от правильных и неправильных ответов
  private styleSelectedAnsw( index: number ){
    if( this.actualUserAnswer && this.actualRightAnswer ){
      return {
        ['is-done-true']: this.taskIsDone && index === this.actualUserAnswer - 1,
        ['is-done-false']: !this.taskIsDone && index === this.actualUserAnswer - 1,
        ['is-true']: index === this.actualRightAnswer - 1,
      }
    }
    if( this.actualRightAnswer ){
      return {
        ['is-true']: index === this.actualRightAnswer - 1,
      }
    }
  }

}
</script>

<style scoped lang="sass">
@import "src/common/assets/common"
.table-cell-answ
  padding: 0 15px
  box-sizing: border-box
  display: table-cell
  border: 1px solid rgba(198, 209, 221, 0.5)

  &__radio
    margin: 10px 0
    display: flex
    justify-content: space-between
    align-items: center
    label
      line-height: 1.5
      width: 95%
    .radio-div
      border: 2px solid #8C9196
      width: 13px
      height: 13px
      border-radius: 50%
      display: flex
      justify-content: center
      align-items: center
    .is-done-false
      border-color: red
      &:before
        content: ''
        width: 7px
        height: 7px
        border-radius: 50%
        background: red
    .is-done-true
      border-color: green
      &:before
        content: ''
        width: 7px
        height: 7px
        border-radius: 50%
        background: green
    .is-true
      border-color: green
</style>
