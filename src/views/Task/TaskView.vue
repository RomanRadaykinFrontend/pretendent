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
            ) {{ hours }}:{{ /^[0-9]$/.test(minutes) ? '0' + minutes : minutes }}:
          | {{ /^[0-9]$/.test(seconds) ? '0' + seconds : seconds }}
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
Component.registerHooks([
  'beforeDestroy',
])
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

  get timeRemain(){
    if( commonModule.getters.timeRemain === 0 ){
      this.$router.push( '/final' )
    }
    return commonModule.getters.timeRemain
  }

  get minutes() {
    if( this.timeRemain >= 3600 ){
      return Math.floor( ( this.timeRemain - 3600 ) / 60 ).toString()
    } else {
      return Math.floor( this.timeRemain / 60 ).toString()
    }

  }

  get seconds() {
    return Math.floor( this.timeRemain % 60 ).toString()
  }

  get hours() {
    return Math.floor( this.timeRemain / 3600 ).toString()
  }


  private showModalWindow(){
    commonModule.mutations.setIsModalWindowShowed( true )
  }

}

</script>

<style scoped lang="sass" src="./TaskView.sass">
</style>
