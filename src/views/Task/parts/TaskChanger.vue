<template lang="pug">
  .task-changer__wrapper
    app-question-button(
      v-for = "(q,index) in questions.length"
      :key = "index"
      :class = "+$route.params.id === q ? 'task-focus' : ''"
      @change-question = "changeTask(q, $event)"
      :question-number = "q"
    ) {{ q }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { questions } from '@/common/questions'
import AppQuestionButton from '@/views/Task/parts/QuestionButton.vue'
import {  sendAnswers } from '@/helpers/functions'

@Component({
  components: { AppQuestionButton },
})
export default class TaskChanger extends Vue{

  @Prop() private arrayOfValues!: Array<string>

  private questions = questions

  private changeTask( nextTask: number, previousTask: number ){
    if( nextTask !== previousTask ){
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
.task-changer__wrapper
  width: 872px
  height: 72px
  display: flex
  flex-wrap: wrap

  .task-focus
    border: 3px solid #1A8BDB

@media screen and (max-width: 768px)
  .task-changer__wrapper
    width: 730px
    justify-content: center
    height: auto
    margin-top: 30px
@media screen and (max-width: 320px)
  .task-changer__wrapper
    width: 300px
</style>
