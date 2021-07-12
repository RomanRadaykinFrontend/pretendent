<template lang="pug">
  .task-info
    TaskChanger(
      :array-of-values = "currentQuestion.answers"
      :question-total-count = "questionTotalCount"
      )
    .task-info__control-panel
      .task-info__time-remain
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { commonModule } from '@/store'
import TaskChanger from '@/views/Task/parts/TaskChanger.vue'
import { Questions } from '@/services/api'

@Component({
  components: {
    TaskChanger,
  },
})
export default class TaskInfo extends Vue{

  @Prop() private currentQuestion!: Questions
  @Prop() private questionTotalCount!: number


  get timeRemain(){
    if( commonModule.getters.timeRemain <= 0 ){
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

<style scoped lang="sass">
@import '../../../common/assets/common'
.task-info
  display: flex
  justify-content: space-between
  width: 1100px
  padding: 20px 20px
  box-sizing: border-box
  &__control-panel
    font-size: 16px
    display: flex
    flex-direction: column
    align-items: flex-end
  &__time-remain
    margin-top: 13px
  &__test-end
    margin-top: 18px
    background: none
    color: $primary-color
    border: none
    outline: none
    font-size: 16px
    padding: 0
    cursor: pointer

@media screen and (max-width: 1024px)
  .task-info
    flex-direction: column-reverse
    width: 100%
    height: auto
    margin-top: 30px
    padding: 0
    &__control-panel
      flex-direction: row
      justify-content: space-evenly

</style>
