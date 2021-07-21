<template lang="pug">
  .task-view
    .task-view__header
      .task-view__question-title Вопрос {{ currentQuestion.id }}
      .task-view__answers-title Варианты ответов
    TaskBody(
      :current-question="currentQuestion"
      :question-total-count="questionTotalCount"
    )
    TaskInfo(
      :current-question="currentQuestion"
      :question-total-count="questionTotalCount"
    )
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import TaskInfo from '@/views/Task/parts/TaskInfo.vue'
import TaskBody from '@/views/Task/parts/TaskBody.vue'
import { testingModule } from '@/store'

@Component({
  components: {
    TaskInfo,
    TaskBody,
  },
})
export default class TaskView extends Vue {

  get allQuestions(){
    return testingModule.getters.allQuestions ?? []
  }
  get currentQuestion(){
    return this.allQuestions[+this.$route.params.id - 1] ?? {}
  }
  get questionTotalCount(){
    return testingModule.getters.questionTotalCount ?? 0
  }
}

</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.task-view
  width: 100%
  height: 100%
  background: url("./../../common/images/task-background.png") no-repeat
  background-size: cover
  box-sizing: border-box
  padding: 20px
  position: relative
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center
  font-family: Roboto, serif
  &__header
    display: flex
    justify-content: space-between
    width: 1100px
  &__question-title, &__answers-title
    width: 50%
    padding: 10px 20px
    font-family: Roboto, serif
    font-style: normal
    font-weight: normal
    font-size: 16px

@media screen and (max-width: 1024px)
  .task-view
    width: 100%
    height: auto
    padding: 15px 15px
    &__header
      display: none

</style>
