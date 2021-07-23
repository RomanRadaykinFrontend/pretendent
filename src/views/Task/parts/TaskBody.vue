<template lang="pug">
  .task-body
    .task-body__task-question
      .task-body__task-title {{ actualQuestion}}
      TaskCode(
        v-show = " currentQuestion.code !== '' "
        :code = " currentQuestion.code "
      )

    .task-body__task-answers
      RadioView(
        :ordinalNumber = " currentQuestion.orderNumber "
        :array-of-values = "currentQuestion.answers"
        :questionNumber = " currentQuestion.orderNumber "
        :totalCount = "questionTotalCount"
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TaskCode from '@/views/Task/parts/TaskCode.vue'
import RadioView from '@/views/Task/parts/RadioView.vue'
import { Questions } from '@/services/api'

@Component({
  components: {
    TaskCode, RadioView,
  },
})
export default class TaskBody extends Vue {

  @Prop() private currentQuestion!: Questions
  @Prop() private questionTotalCount!: number

  get actualQuestion(){
    return this.currentQuestion.question ?? {}
  }

}
</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.task-body
  width: 1100px
  height: 730px
  border: 1px solid white
  box-sizing: border-box
  background: #FFFFFF
  box-shadow: 0 4px 32px rgba(77, 100, 170, 0.1)
  border-radius: 4px
  display: flex
  overflow: hidden
  -moz-user-select: none
  -webkit-user-select: none
  -ms-user-select: none
  user-select: none

  &__task-question
    width: 50%
    font: $main-text-style
    padding: 20px
    line-height: 2
    overflow-x: scroll
    @include custom-scroll-bar
  &__task-title
    font-weight: bold
    line-height: 1.5
  &__task-answers
    width: 50%
    background: white
    padding: 20px
    border-left: 2px solid #EEF2FF

@media screen and (max-width: 1024px)
  .task-body
    width: 100%
    height: auto
    &__task-question
      height: auto
      line-height: 1.5
    &__task-answers
      border: none
@media screen and (max-width: 479px)
  .task-body
    flex-direction: column
    border: none
    box-shadow: none
    &__task-answers, &__task-question
      width: 100%
      background: white
      padding: 0
      box-sizing: border-box
    &__task-question
      padding: 12px
      box-sizing: border-box
</style>
