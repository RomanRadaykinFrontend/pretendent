<template lang="pug">
  div
    form.form-radio(@submit.prevent = "onSubmitHandler")
      .radio-answer(
        v-for = "(value, index) in arrayOfValues"
        :key = "value"
      )
        div
          input.radio-button(
            type = "radio"
            :id = "index + 1"
            :value = "value"
            v-model = "picked"
          )
          label.radio-label(
            :for = "index + 1"
          ) {{ value }}
      .radio-warning(v-if = "isWarningShow===true")
        label Выберите ответ или пропустите вопрос
      .buttons-block
        app-button(
          :is-primary = "true"
          name-of-button = "know"
          ) Далее
        app-button(
          :is-primary = "false"
          name-of-button = "unknown"
          ) Не знаю
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import AppButton from '../../components/AppButton.vue'
import { commonModule } from '@/store'

@Component({
  components: {
    AppButton,
  },
})

export default class RadioView extends Vue {

  private answers = commonModule.getters.answers


  @Prop() private totalCount!: number
  @Prop() private arrayOfValues!: Array<string>
  @Prop() private questionNumber!: number

  private isWarningShow = false
  private picked = ''

  // хэндлер формы
  private async onSubmitHandler( event: any ){

    if( event.submitter.name === 'unknown' ) {
      commonModule.mutations.setAnswers({ question: this.questionNumber,  answer: 0 })
      await this.changePageHandler()
    } else {
      if( this.picked !== '' ){
        const answer = this.arrayOfValues.indexOf( this.picked ) + 1
        commonModule.mutations.setAnswers({ question: this.questionNumber, answer })
        await this.changePageHandler()
      }
      this.isWarningShow = true
    }
    await commonModule.actions.fetchAnswers({
      answers:  this.answers,
    })
  }

  // хелпер по переключению страниц
  private changePageHandler(){
    if( this.totalCount === +this.$route.params.id ) {
      this.$router.push( '/final' )
    } else {
      this.$router.push({ name: 'TaskView', params: {
        id: ( 1 + this.questionNumber ).toString(),
      }})
    }
  }

  @Watch( 'picked' )
  private hideWarningInput(){
    if( this.picked !== '' ){
      this.isWarningShow = false
    }
  }
}

</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.form-radio
  margin: 10px 0

  .radio-button
    transform: scale(1.4)
    margin: 10px 10px 10px 0

  .radio-answer, .radio-label
    font: $answer-text-style

  .radio-answer
    display: flex
    align-items: center

    .another-answer
      margin-left: 15px
      @include main-input


  .radio-warning
    font: $main-text-style
    color: rgb(216, 44, 13)
    padding-top: 30px


  .buttons-block
    display: flex

@media screen and (max-width: 400px)
  .radio-answer.another-input-with-input
    flex-direction: column
    align-items: start
</style>
