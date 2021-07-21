<template lang="pug">
.table-row-answ
  TableCellAnsw.number(
    :value = "questNumber"
    type = "number"
  )
  TableCellAnsw.question(
    :value = "question"
    :code = "code"
    type = "task"
  )
  TableCellAnsw.answers(
    :value = "answers"
    type = "answersArr"
    :user-answer = "userAnswer"
    :right-answer = "rightAnswer"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableCellAnsw from '@/views/AnswersViewerView/parts/TableCellAnsw.vue'
import { Answer, CorrectAnswer, Questions } from '@/services/api'

@Component({
  components: { TableCellAnsw },
})
export default class TableRowAnsw extends Vue{
  @Prop() private tableValue!: Questions
  @Prop() private questNumber!: number
  @Prop() private userAnswer!: Answer
  @Prop() private rightAnswer!: CorrectAnswer

  get question(){
    return this.tableValue.question ? this.tableValue.question : ''
  }
  get code(){
    if( this.tableValue.code ){
      return this.tableValue.code
    }
    return ''
  }
  get answers(){
    return this.tableValue.answers
  }
}
</script>

<style scoped lang="sass">
.table-row-answ
  display: table-row
  font-family: Roboto, serif
  font-style: normal
  font-weight: normal
  font-size: 16px
  color: black

  .number
    width: 20%
  .question
    width: 20%
  .answers
    width: 60%

</style>
