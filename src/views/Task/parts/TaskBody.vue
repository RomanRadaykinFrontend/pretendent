<template lang="pug">
  .task-body
    .task-body__task-question
      .task-body__task-title {{ actualQuestion }}
      TaskCode(
        v-show = "actualTask.hasOwnProperty('code')"
        :code = "actualTask.code"
      )

    .task-body__task-answers
      RadioView(
        ordinalNumber = "taskNumber"
        :array-of-values = "actualAnswers"
        :questionNumber = "taskNumber"
        :totalCount = "countQuestions"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Base64 } from 'js-base64'
import { questions } from '@/common/questions'
import TaskCode from '@/views/Task/parts/TaskCode.vue'
import RadioView from '@/views/Task/parts/RadioView.vue'

@Component({
  components: {
    TaskCode, RadioView,
  },
})
export default class TaskBody extends Vue {

  private questions = questions
  private taskNumber = +this.$route.params.id
  private countQuestions = this.questions.length
  private actualTask = this.questions[this.taskNumber - 1]
  private actualQuestion = Base64.decode( this.actualTask.question )
  private actualAnswers = this.actualTask.answers

}
</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.task-body
  width: 1100px
  height: 730px
  border: 1px solid #97979D
  box-sizing: border-box
  background: #FFFFFF
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08)
  border-radius: 8px
  display: flex
  overflow: hidden

  &__task-question
    width: 50%
    font: $main-text-style
    padding: 20px
    line-height: 2
    overflow-x: scroll
    @include custom-scroll-bar
  &__task-title
    font-weight: bold
  &__task-answers
    width: 50%
    background: #FAFAFA
    padding: 20px

@media screen and (max-width: 1024px)
  .task-body
    width: 100%
    height: auto
@media screen and (max-width: 479px)
  .task-body
    height: auto
    flex-direction: column
    border: none
    box-shadow: none
    &__task-answers, &__task-question
      width: 100%
      padding: 0
      background: white

</style>
