<template lang="pug">
  .task-info
    .task-info__task-control
      TaskChanger(
        :array-of-values = "currentQuestion.answers"
        :question-total-count = "questionTotalCount"
        )
      .task-info__control-panel
        TimeRemain(
          :seconds = "seconds"
          :minutes = "minutes"
          :hours = "hours"
        )
    .task-info__description
      .task-info__text
        p Если сомневаетесь в ответе, то просто кликнете на другой.
        p Также ответ всегда можно изменить.
      button.task-info__test-end(
        @click.prevent="showModalWindow"
      ) Закончить тест
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { testingModule } from '@/store'
import TaskChanger from '@/views/Task/parts/TaskChanger.vue'
import { Questions } from '@/services/api'
import TimeRemain from '@/views/Task/parts/TimeRemain.vue'

@Component({
  components: {
    TimeRemain,
    TaskChanger,
  },
})
export default class TaskInfo extends Vue{

  @Prop() private currentQuestion!: Questions
  @Prop() private questionTotalCount!: number

  get timeRemain(){
    if( testingModule.getters.timeRemain <= 0 ){
      this.$router.push( '/final' )
    }
    return testingModule.getters.timeRemain
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
    testingModule.mutations.setIsModalWindowShowed( true )
  }
}
</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.task-info
  display: flex
  flex-direction: column
  width: 1100px
  padding: 20px 20px
  box-sizing: border-box
  &__task-control
    display: flex
    justify-content: space-between
    align-items: center
  &__description
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 5px
  &__control-panel
    font-size: 16px
    display: flex
    flex-direction: column
    align-items: flex-end

  &__text
    font-family: Roboto, serif
    font-style: normal
    font-weight: normal
    font-size: 16px
    letter-spacing: 0.02em
    line-height: 0.5
  &__test-end
    font-family: Roboto, serif
    font-style: normal
    font-weight: 500
    font-size: 14px
    letter-spacing: 0.02em
    color: #DB1A26
    border-radius: 2px
    border: 1px solid #FFF3F3
    background: #FFF3F3
    width: 200px
    outline: none
    cursor: pointer
    padding: 8px 16px
    display: flex
    align-self: center
    justify-content: center
    &:hover
      background: #FFE9E9

@media screen and (max-width: 1024px)
  .task-info
    flex-direction: column
    width: 100%
    height: auto
    margin-top: 15px
    padding: 0
    &__task-control
      flex-direction: column-reverse
    &__control-panel
      margin-top: 15px
      flex-direction: row
      justify-content: space-evenly
    &__description
      flex-direction: column-reverse
    &__text
      line-height: 1
      text-align: center
      font-size: 12px
    &__test-end
      margin-top: 15px
      width: 100%

@media screen and (max-width: 414px)
  .task-info
    &__control-panel
      width: 100%
</style>
