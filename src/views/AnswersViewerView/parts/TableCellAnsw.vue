<template lang="pug">
.table-cell-answ
  .table-cell-answ__task-number( v-show = " type === 'number' " )
    span {{ cellValue }}
  .table-cell-answ__text-code( v-show = " type === 'task' " )
    span {{ cellValue }}
    Highlight( v-show = " showCode " ) {{ codeValue }}
  .table-cell-answ__radio(
    v-show = " type === 'answersArr' "
    v-for = "(answer, index) in cellValue"
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import hljs from 'highlight.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Highlight from 'vue-highlight-component'
import { PropAnswer } from '@/types/common'

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
  @Prop({ required: false }) private selectedAnswer!: PropAnswer
  @Prop() private rightAnswer!: PropAnswer

  get cellValue(){
    return this.value
  }
  get codeValue(){
    return this.code
  }
  get showCode(){
    return this.codeValue !== ''
  }

  get answ(){
    return this.selectedAnswer
  }

  get taskIsDone(){
    return this.selectedAnswer?.answer === this.rightAnswer?.answer
  }

  // получаем класс радио-кнопок в зависимости от правильных и неправильных ответов
  private styleSelectedAnsw( index: number ){
    if( this.answ?.answer && this.rightAnswer?.answer ){
      return {
        ['is-done-true']: this.taskIsDone && index === this.answ?.answer - 1,
        ['is-done-false']: !this.taskIsDone && index === this.answ?.answer - 1,
        ['is-true']: index === this.rightAnswer.answer - 1,
      }
    }
    if( this.rightAnswer?.answer ){
      return {
        ['is-true']: index === this.rightAnswer.answer - 1,
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
