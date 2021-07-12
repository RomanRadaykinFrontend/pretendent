<template lang="pug">
  .task-view
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
import { commonModule } from '@/store'

@Component({
  components: {
    TaskInfo,
    TaskBody,
  },
})
export default class TaskView extends Vue {

  get allQuestions(){
    return commonModule.getters.allQuestions
  }
  get currentQuestion(){
    return this.allQuestions[+this.$route.params.id - 1] || {}
  }
  get questionTotalCount(){
    return commonModule.getters.questionTotalCount || 0
  }


}

</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.task-view
  width: 100%
  height: 100%
  background: url("./../../common/images/task-background.png")
  box-sizing: border-box
  padding: 20px
  position: relative
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center
  font-family: Roboto, serif

@media screen and (max-width: 1024px)
  .task-view
    width: 100%
    height: 100%
    padding: 15px 15px
</style>
