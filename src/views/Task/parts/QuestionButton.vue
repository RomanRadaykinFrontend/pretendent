<template lang="pug">
    button.app-question-button(
    @click.prevent = "$emit('change-question', $route.params.id)"
    :class = "styleDoneIsApplied ? 'done' : ''"
    ) {{ questionNumber }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { commonModule } from '@/store'

@Component
export default class QuestionButton extends Vue{
  @Prop() private questionNumber!: number
  private doneTaskList = commonModule.getters.doneTaskList
  private doneTasks = this.doneTaskList.map( item => item.taskNumber )
  private styleDoneIsApplied = this.doneTasks.includes( this.questionNumber )

}
</script>

<style scoped lang="sass">
.app-question-button
  width: 32px
  height: 32px
  background: #E1E1E1
  border-radius: 2px
  outline: none
  border: none
  color: #5A5A5A
  margin: 4px 3px
  &:hover
    cursor: pointer
    background: #D2D2D2
  &.done
    background: #1A8BDB
    color: white
@media screen and (max-width: 320px)
  .app-question-button
    width: 47px
    height: 47px

</style>
