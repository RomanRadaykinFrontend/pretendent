<template lang="pug">
  .info-wrapper
    .remain-time
      span Осталось времени:&nbsp
        span(
          :style = "timeRemain <= 20 && {color: 'red'}"
          ) {{ minutes }}:{{ /^[0-9]$/.test(seconds) ? '0' + seconds : seconds }}
    .remain-question
      span Вопрос {{ taskNumber }}/ {{ totalCount }}
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { commonModule } from '@/store'

@Component

export default class TaskInfoView extends Vue {

  @Prop() private totalCount!: number
  @Prop() private taskNumber!: number

  private answers = commonModule.getters.answers
  private setAnswers = commonModule.mutations.setAnswers
  private fetchAnswers = commonModule.actions.fetchAnswers

  private timeRemain = 120
  private timerId = setInterval( this.changeTime, 1000 )
  // функция-таймер
  private async changeTime(){
    this.timeRemain -= 1
    if( this.timeRemain === 0 ) {
      clearInterval( this.timerId )
      this.setAnswers({ answer: 0, question: this.taskNumber })
      await this.fetchAnswers({
        answers:  this.answers,
      })

      if( this.totalCount === this.taskNumber ) {
        await this.$router.push({ name: 'FinalPageView.vue' })
      } else {
        await this.$router.push({ name: 'TaskView.vue', params: {
          id: ( this.taskNumber + 1 ).toString(),
        }})
      }

    }
  }

  get minutes() {
    return Math.floor( this.timeRemain / 60 ).toString()
  }

  get seconds() {
    return Math.floor( this.timeRemain % 60 ).toString()
  }

}
</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.info-wrapper
  position: absolute
  right: -45%
  top: 10%

.remain-time, .remain-question
  padding: 10px 0
  color: rgb(128, 128, 128)
  font: $main-text-style


@media screen and (max-width: 1500px)
  .info-wrapper
    right: 0
    top: -35px
    display: flex
    width: 100%
    justify-content: space-around

</style>
