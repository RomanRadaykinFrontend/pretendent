<template lang="pug">
.time-remain
  .time-remain__time
    .time-remain__number {{ minutesNum[0] }}
    .time-remain__number {{ minutesNum[1] }}
    span.time-remain__colons :
    .time-remain__number( :class = "minutesClass" ) {{ secondsNum[0] }}
    .time-remain__number( :class = "minutesClass" ) {{ secondsNum[1] }}
  .time-remain__text До окончания теста
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getTime } from '@/helpers/functions'

@Component

export default class TimeRemain extends Vue{
  @Prop() seconds!: string
  @Prop() minutes!: string
  @Prop() hours!: string

  get secondsNum(){
    return getTime( this.seconds )
  }

  get minutesNum(){
    const minutes = getTime( this.minutes )
    return this.hoursNum !== 0 ?
      ( +minutes.join( '' ) + this.hoursNum ).toString().split( '' ) :
      minutes
  }

  get hoursNum(){
    return +this.hours > 0 ? +this.hours * 60 : 0
  }

  get minutesClass(){
    return {
      'time-end': +this.secondsNum.join( '' ) < 10 && +this.minutesNum === 0,
    }
  }

}
</script>

<style scoped lang="sass">
.time-remain
  width: 200px
  justify-content: center
  background: #D2DBF7
  backdrop-filter: blur(4px)
  border-radius: 2px
  &__time
    display: flex
    justify-content: center
    align-items: center
    margin-top: 4px
  &__text
    font-family: Roboto, serif
    font-style: normal
    font-weight: 500
    font-size: 14px
    color: #4D64AA
    margin-top: 7px
    margin-bottom: 6px
    text-align: center
  &__number, &__colons
    font-family: Roboto, serif
    font-style: normal
    font-weight: normal
    font-size: 24px
    &.time-end
      color: red
  &__number
    padding: 7px
    border: 1px solid white
    border-radius: 3px
    background: white
    margin: 0 1px

@media screen and (max-width: 414px)
  .time-remain
    width: 100%
</style>
