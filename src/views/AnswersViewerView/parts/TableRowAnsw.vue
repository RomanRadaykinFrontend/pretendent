<template lang="pug">
.table-row-answ( :class = "rowClass" )
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
  )

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableCellAnsw from '@/views/AnswersViewerView/parts/TableCellAnsw.vue'
import { Question } from '@/common/questions'
import { Base64 } from 'js-base64'

@Component({
  components: { TableCellAnsw },
})
export default class TableRowAnsw extends Vue{
  @Prop({ default: false }) private isHeaderRow!: boolean
  @Prop() private tableValue!: Question
  @Prop() private questNumber!: number

  get rowClass(){
    return {
      ['header-row']: this.isHeaderRow,
    }
  }

  get value(){
    return this.tableValue
  }
  get question(){
    return Base64.decode( this.value.question )
  }
  get code(){
    if( this.value.code ){
      return Base64.decode( this.value.code )
    }
    return ''

  }
  get answers(){
    return this.value.answers
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
