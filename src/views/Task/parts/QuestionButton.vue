<template lang="pug">
    button.question-button(
    @click.prevent = "$emit('change-question', $route.params.id)"
    :class = " doneClass "
    ) {{ questionNumber }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { testingModule } from '@/store'

@Component
export default class QuestionButton extends Vue{
  @Prop() private questionNumber!: number
  @Prop() private allQuestions!: number
  private doneTaskList = testingModule.getters.doneTaskList
  private doneTasks = this.doneTaskList.map( item => item.taskNumber )
  private needTasks = this.allQuestions.map( ( n, index ) => {
    if( this.doneTasks.includes( n.id ) ){
      return index + 1
    }
  })
  private styleDoneIsApplied = this.needTasks.includes( this.questionNumber )

  get doneClass(){
    if( this.styleDoneIsApplied && +this.$route.params.id === this.questionNumber ){
      return'done-check'
    } else if( this.styleDoneIsApplied ) {
      return'done'
    } else {
      return ''
    }
  }

}
</script>

<style scoped lang="sass">
.question-button
  width: 32px
  height: 32px
  background: #FFFFFF
  border-radius: 2px
  outline: none
  border: none
  color: #5A5A5A
  margin: 3px
  &:hover
    cursor: pointer
    background: #EEF2FF

  &.done
    background: #4D64AA
    color: white
    &:hover
      background: #4159A1
  &.done-check
    background: #4D64AA
    box-sizing: border-box
    outline: 2.5px solid #4D64AA
    color: white
    border-radius: 0


@media screen and (max-width: 1024px)
  .question-button
    width: 40px
    height: 40px

</style>
