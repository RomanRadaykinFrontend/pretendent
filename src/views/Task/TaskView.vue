<template lang="pug">
  .task-wrapper
    .task-container
      .task-question
        .task-title {{ actualQuestion }}
      .task-answers
        radio-view(
          ordinalNumber = "taskNumber"
          :array-of-values = "actualAnswers"
          :questionNumber = "taskNumber"
          :totalCount = "countQuestions"
        )
    .task-info
      task-changer(
        :array-of-values = "actualAnswers"
      )
      .task-info__control-panel
        .task-ingo__time-remain
          span Осталось &nbsp
            span(
              :style = "timeRemain <= 20 && {color: 'red'}"
            ) {{ minutes }}:{{ /^[0-9]$/.test(seconds) ? '0' + seconds : seconds }}
        button.task-info__test-end(
          @click.prevent="showModalWindow"
        ) Закончить тест
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import RadioView from './parts/RadioView.vue'
import { questions } from '@/common/questions'
import TaskChanger from '@/views/Task/parts/TaskChanger.vue'
import { commonModule } from '@/store'

@Component({
  components: {
    TaskChanger,
    RadioView,
  },
})
export default class TaskView extends Vue {
  private questions = questions
  private taskNumber = +this.$route.params.id
  private countQuestions = this.questions.length
  private actualTask = this.questions[this.taskNumber - 1]
  private actualQuestion = this.actualTask.question
  private actualAnswers = this.actualTask.answers

  private timeRemain = 5400
  private timerId = setInterval( this.changeTime, 1000 )


  // функция-таймер
  private async changeTime(){
    this.timeRemain -= 1
    if( this.timeRemain === 0 ) {
      clearInterval( this.timerId )
      await this.$router.push( '/final' )
    }
  }

  get minutes() {
    return Math.floor( this.timeRemain / 60 ).toString()
  }

  get seconds() {
    return Math.floor( this.timeRemain % 60 ).toString()
  }

  private showModalWindow(){
    commonModule.mutations.setIsModalWindowShowed( true )
  }

}

</script>

<style scoped lang="sass" src="./TaskView.sass">
</style>
