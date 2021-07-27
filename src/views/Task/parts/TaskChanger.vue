<template lang="pug">
  .task-changer
    QuestionButton(
      v-for = "(q,index) in allQuestions"
      :key = "index"
      :class = "+$route.params.id === index+1 ? 'task-changer__task-focus' : ''"
      @change-question = "changeTask(index+1, $event)"
      :question-number = "index + 1"
      :all-questions = "allQuestions"
    ) {{ index + 1 }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import QuestionButton from '@/views/Task/parts/QuestionButton.vue'
import {  sendAnswers } from '@/helpers/functions'

@Component({
  components: { QuestionButton },
})
export default class TaskChanger extends Vue{

  @Prop() private arrayOfValues!: Array<string>
  @Prop() private allQuestions!: number

  private changeTask( nextTask: number, previousTask: number ){
    if( nextTask !== +previousTask ){
      sendAnswers( this.arrayOfValues )
      localStorage.task = nextTask
      this.$router.push({
        name: 'TaskView', params: {
          id: ( nextTask ).toString(),
        },
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.task-changer
  width: 872px
  display: flex
  flex-wrap: wrap

  &__task-focus
    border: 3px solid #4D64AA

@media screen and (max-width: 1024px)
  .task-changer
    width: 100%
    justify-content: center
    height: auto
    margin-top: 15px

</style>
