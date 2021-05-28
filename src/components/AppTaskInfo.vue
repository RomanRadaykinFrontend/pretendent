<template lang="pug">
  .info-wrapper
    .remain-time
      span Осталось времени:
        span(:style="timeRemain <= 20 && {color: 'red'}") {{ minutes }}:{{ seconds }}
    .remain-question
      span Вопрос {{ taskNumber }}/ {{ totalCount }}
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { AddNewAnswersRequest, Answer, Answers } from '../services/api'
import { FETCH_ANSWERS } from '@/store/action.types'
import { SET_ANSWERS } from '@/store/mutation.types'

const CommonModule = namespace( 'commonModule' )

@Component

export default class AppTaskInfo extends Vue {

  @Prop() private totalCount!: number
  @Prop() private taskNumber!: number

  @CommonModule.Getter( 'answers' ) private answers!: Answers
  @CommonModule.Mutation( SET_ANSWERS ) private setAnswers!: ( answer: Answer ) => void
  @CommonModule.Action( FETCH_ANSWERS ) private fetchAnswers!: ( data: AddNewAnswersRequest ) => void

  private timeRemain = 120
  // функция-таймер
  private async changeTime(){
    this.timeRemain -= 1
    if( this.timeRemain === 0 ) {
      clearInterval( this.timerId )
      this.setAnswers({ answer: 0, question: this.taskNumber })
      await this.fetchAnswers({
        answers:  this.answers,
      })

      this.totalCount === this.taskNumber ?
        await this.$router.push({ name: 'AppFinalPage' }) :
        await this.$router.push({ name: 'AppTask', params: {
          id: ( this.taskNumber + 1 ).toString(),
        }})
    }
  }

  private timerId = setInterval( this.changeTime, 1000 )

  get minutes() {
    return Math.floor( this.timeRemain / 60 )
  }

  get seconds() {
    return Math.floor( this.timeRemain % 60 )
  }

}
</script>

<style scoped lang="sass">
@import '../common/assets/common'
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
