<template lang="pug">
  .task-wrapper
    .task-title {{ actualQuestion }}
    radio-view(
      ordinalNumber = "taskNumber"
      :array-of-values = "actualAnswers"
      :questionNumber = "taskNumber"
      :totalCount = "countQuestions"
    )
    task-info-view(
      :totalCount = "countQuestions"
      :taskNumber = "taskNumber"
      )
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import RadioView from './parts/RadioView.vue'
import TaskInfoView from './parts/TaskInfoView.vue'
import { questions } from '@/common/questions'

@Component({
  components: {
    TaskInfoView,
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

}

</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.task-wrapper
  width: 30%
  height: auto
  margin: 3% auto
  box-sizing: border-box
  padding: 20px
  border: 1px solid rgb(140, 145, 150)
  border-radius: 10px
  position: relative

  .task-title
    font: $main-text-style

  .buttons-wrapper
    display: flex

@media screen and (max-width: 1200px)
  .task-wrapper
    width: 50%
    margin-top: 60px

@media screen and (max-width: 800px)
  .task-wrapper
    width: 70%

@media screen and (max-width: 550px)
  .task-wrapper
    width: 90%

@media screen and (max-width: 350px)
  .task-wrapper
    width: 100%
</style>
