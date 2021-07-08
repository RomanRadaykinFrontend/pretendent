<template lang="pug">
  .task-body
    .task-body__task-question
      .task-body__task-title {{ actualQuestion}}
      TaskCode(
        v-show = " currentQuestion.hasOwnProperty('code') "
        :code = " currentQuestion.code "
      )

    .task-body__task-answers
      RadioView(
        :ordinalNumber = " currentQuestion.id "
        :array-of-values = "currentQuestion.answers"
        :questionNumber = " currentQuestion.id "
        :totalCount = "questionTotalCount"
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Base64 } from 'js-base64'
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
    return this.currentQuestion.question ? Base64.decode( this.currentQuestion.question ) : ''
  }

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
