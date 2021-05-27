<template lang="pug">
  .task-wrapper
    .task-title {{ actualQuestion }}
    app-radio(
      ordinalNumber="taskNumber"
      :array-of-values="actualAnswers"
      :questionNumber="taskNumber"
      :totalCount="countQuestions"
    )
    app-task-info(
      :totalCount="countQuestions"
      :taskNumber="taskNumber"
      )
</template>

<script lang="ts">

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import AppRadio from '../components/AppRadio.vue'
import AppTaskInfo from '../components/AppTaskInfo.vue'
import { namespace } from 'vuex-class'
import { questions } from '@/common/questions'

@Component({
  components: {
    AppTaskInfo,
    AppRadio,
  },
})
export default class AppTask extends Vue {
  private questions = questions
  private taskNumber = +this.$route.params.id
  private countQuestions = Object.entries( this.questions ).length
  private questionsArray = Object.entries( this.questions[this.taskNumber])
  private actualTask = this.questionsArray[0]
  private actualQuestion = this.actualTask[0]
  private actualAnswers = this.actualTask[1]

}

</script>

<style scoped lang="sass">
@import '../common/assets/common'
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
