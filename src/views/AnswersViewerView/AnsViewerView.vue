<template lang="pug">
.ans-viewer-view( :class = "ansViewerViewClass" )
  VueSimpleSpinner.spinner(
    size = "huge"
    v-if = " isAllDataFetched "
  )
  AdminHeader(
    v-if = " !isAllDataFetched "
    button-name = "Задать роли"
    @click-button = "goToUserPerm"
  )
  .ans-viewer-view__content
    .ans-viewer-view__control-panel(
      v-if = " !isAllDataFetched "
    )
      button( @click = " () => $router.push('/adminpanel')" ).ans-viewer-view__back-button Назад
      h1.ans-viewer-view__title Просмотр ответов
      select(
        v-model = " taskType "
      ).ans-viewer-view__select
        option( selected ) Все вопросы
        option( :disabled = " isAnsweredFlag " ) Отвеченные вопросы
        option( :disabled = " isNotAnsweredFlag " ) Неотвеченные вопросы
        option( :disabled = " isRightAnswFlag " ) Отвеченные правильно
        option( :disabled = " isWrongAnswFlag " ) Отвеченные неправильно
      .ans-viewer-view__about(
        v-for = " data in pretendData "
        :key = " data.title "
      )
        span.subtitle {{ data.title }}
        span.data {{ data.data }}


    .ans-viewer-view__table(
      v-if = " !isAllDataFetched "
    )
      .ans-viewer-view__table-body
      AppHeaderTableRow(
        :is-header-row = "true"
        :table-value = "headerRow"
        @sort-by-id = "sortByNumber( $event )"
      )
      TableRowAnsw(
        v-for = "(question, index) in sortQuestions"
        :key = "index"
        :table-value = "question"
        :quest-number = "question.orderNumber"
        :user-answer = " getCurrentAnswer( question.orderNumber ) "
        :right-answer = " getCurrentRightAnswer( question.orderNumber ) "
      )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TableRowAnsw from '@/views/AnswersViewerView/parts/TableRowAnsw.vue'
import AppHeaderTableRow from '@/components/AppHeaderTableRow.vue'
import { adminModule } from '@/store'
import { getDate, sortItems } from '@/helpers/functions'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueSimpleSpinner from 'vue-simple-spinner'
import AdminHeader from '@/views/AdminHeader.vue'
import { UserResultWithID } from '@/types/common'

@Component({
  components: {
    AdminHeader,
    TableRowAnsw, AppHeaderTableRow, VueSimpleSpinner,
  },
})
export default class AnsViewerView extends Vue{

  private id = +this.$route.params.id - 1

  private headerRow = [
    { name: 'Номер вопроса', needSort: true },
    { name: 'Вопрос', needSort: false },
    { name: 'Ответ', needSort: false }]

  private sortByNumber( direction: boolean ){
    if( this.taskType === 'Все вопросы' ){
      return this.questions.sort( ( a, b ) => sortItems( a.orderNumber, b.orderNumber, direction ) )
    } else{
      return this.sortQuestions?.sort( ( a, b ) => sortItems( a.orderNumber, b.orderNumber, direction ) )
    }
  }

  get questions(){
    return adminModule.getters.questions || []
  }

  get sortQuestions(){
    return adminModule.getters.sortQuestions.length !== 0 ?
      adminModule.getters.sortQuestions :
      adminModule.getters.questions
  }

  get pretendData(){
    return [
      { title: 'Имя', data: this.userInfo.name },
      { title: 'Email', data: this.userInfo.lastName },
      { title: 'Telegram', data: this.userInfo.telegram },
      { title: 'Правильных ответов', data: `${this.percent}%` },
      { title: 'Дата прохождения', data: getDate( this.userInfo.timeCreate ) },
    ]
  }

  private created(){
    adminModule.actions.getResults()
    adminModule.actions.getAllQuestions()
    adminModule.actions.getRightAnswer()

  }
  private beforeDestroy(){
    adminModule.mutations.setQuestions( this.questions )
    adminModule.mutations.setTypeTasks( 'Все вопросы' )
  }

  get ansViewerViewClass(){
    return{
      ['show-spinner']: this.isAllDataFetched,
    }
  }

  get result(){
    return adminModule.getters.results[ this.id ] || {} as UserResultWithID
  }

  get isAllDataFetched(){
    return adminModule.getters.isAllDataFetched
  }

  get userInfo(){
    return this.result.user ?? {
      name: '',
      lastName: '',
      telegram: '',
      timeCreate: new Date(),
    }
  }
  get percent(){
    return this.result.percent ?? 0
  }
  get answers(){
    if( this.result.answers ){
      return this.result.answers.sort( ( a, b ) => a.question > b.question ? 1: -1  ) ?? []
    }
    return []
  }

  get rightAnswers(){
    return adminModule.getters.rightAnswers
  }

  get userTasksID(){
    return this.answers.map( q => q.question ) ?? []
  }

  get taskType(){
    return adminModule.getters.typeTasks
  }
  set taskType( value: string ){
    adminModule.mutations.setTypeTasks( value )
    this.getNeedQuestions()
  }

  get isRightAnswFlag(){
    return this.answeredRightQuestionList.length === 0
  }
  get isWrongAnswFlag(){
    return this.answeredWrongQuestionList.length === 0
  }
  get isAnsweredFlag(){
    return this.answeredQuestionList.length === 0
  }
  get isNotAnsweredFlag(){
    return this.unAnsweredQuestionList.length === 0
  }

  get answeredQuestionList(){
    return this.questions.filter( q => q.orderNumber ? this.userTasksID.includes( q.orderNumber ) : false ) ?? []
  }

  get unAnsweredQuestionList(){
    return this.questions.filter( q => q.orderNumber ? !this.userTasksID.includes( q.orderNumber ) : false ) ?? []
  }

  get answeredRightQuestionList(){
    return this.answeredQuestionList.filter( aq => {
      const userA = this.answers.find( uq => uq.question === aq.orderNumber )
      const rightA = this.rightAnswers.find( rq => rq.id + 1 === aq.orderNumber )
      if( userA && rightA ){
        return userA.question === rightA.id + 1 && userA.answer === rightA.answers[0]
      }
    },
    ) ?? []
  }

  get answeredWrongQuestionList(){
    return this.answeredQuestionList.filter( aq => {
      const userA = this.answers.find( uq => uq.question === aq.orderNumber )
      const rightA = this.rightAnswers.find( rq => rq.id + 1 === aq.orderNumber )
      if( userA && rightA ){
        return !( userA.question === rightA.id + 1 && userA.answer === rightA.answers[0])
      }

    },
    ) ?? []
  }

  private getNeedQuestions(){
    switch ( this.taskType ){
    case 'Отвеченные вопросы': {
      adminModule.mutations.setSortQuestions( this.answeredQuestionList )
      break
    }
    case 'Неотвеченные вопросы': {
      adminModule.mutations.setSortQuestions( this.unAnsweredQuestionList )
      break
    }
    case 'Отвеченные правильно':{
      adminModule.mutations.setSortQuestions( this.answeredRightQuestionList )
      break
    }
    case 'Отвеченные неправильно':{
      adminModule.mutations.setSortQuestions( this.answeredWrongQuestionList )
      break
    }
    default: {
      return adminModule.mutations.setSortQuestions( this.questions )
    }
    }
  }

  private getCurrentAnswer( questNumb: number ){
    return this.answers?.find( answ => answ.question === questNumb )
  }
  private getCurrentRightAnswer( questNumb: number ){
    return this.rightAnswers.find( answ => answ.id + 1 === questNumb )
  }

  private goToUserPerm(){
    this.$router.push( '/userpermissions' )
  }

}
</script>

<style scoped lang="sass" src="./AnsViewerView.sass">
</style>
