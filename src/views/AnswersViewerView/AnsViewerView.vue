<template lang="pug">
.ans-viewer-view
  .ans-viewer-view__control-panel
    button( @click = " () => $router.push('/admin')" ).ans-viewer-view__back-button Назад
    h1.ans-viewer-view__title Просмотр ответов
    select(
      v-model = " taskType "
    ).ans-viewer-view__select
      option( selected ) Все вопросы
      option( :disabled = "isAnsweredFlag" ) Отвеченные вопросы
      option( :disabled = "isNotAnsweredFlag" ) Неотвеченные вопросы
      option( :disabled = "isRightAnswFlag" ) Отвеченные правильно
      option( :disabled = "isWrongAnswFlag" ) Отвеченные неправильно
    .ans-viewer-view__about(
      v-for = " data in pretendData "
      :key = " data.title "
    )
      span.subtitle {{ data.title }}
      span.data {{ data.data }}


  .ans-viewer-view__table
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
      :quest-number = "question.id"
      :user-answer = " getCurrentAnswer( question.id ) "
      :right-answer = " getCurrentRightAnswer( question.id ) "
    )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TableRowAnsw from '@/views/AnswersViewerView/parts/TableRowAnsw.vue'
import AppHeaderTableRow from '@/components/AppHeaderTableRow.vue'
import { adminModule } from '@/store'
import { getDate, sortItems } from '@/helpers/functions'
import { rightAnswers } from '@/common/questions'

@Component({
  components: {
    TableRowAnsw, AppHeaderTableRow,
  },
})
export default class AnsViewerView extends Vue{

  private id = +this.$route.params.id - 1

  private headerRow = [
    { name: 'Номер вопроса', needSort: true },
    { name: 'Вопрос', needSort: false },
    { name: 'Ответ', needSort: false }]

  private sortByNumber( direction: boolean ){
    return this.questions.sort( ( a, b ) => sortItems( a.id, b.id, direction ) )
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
      { title: 'Имя', data: this.userInfo?.name },
      { title: 'Email', data: this.userInfo?.lastName },
      { title: 'Telegram', data: this.userInfo?.telegram },
      { title: 'Правильных ответов', data: `${this.percent}%` },
      { title: 'Дата прохождения', data: getDate( this.userInfo?.timeCreate || new Date() ) },
    ]
  }

  private mounted(){
    adminModule.actions.getResults({ offset: 0, limit: +this.$route.params.id })
    adminModule.actions.getAllQuestions()
    adminModule.actions.getRightAnswer()
  }
  private beforeDestroy(){
    adminModule.mutations.setQuestions( this.questions )
    adminModule.mutations.setTypeTasks( 'Все вопросы' )
  }

  get result(){
    return adminModule.getters.results[this.id] || {}
  }

  get userInfo(){
    return this.result?.user ?? {}
  }
  get percent(){
    return this.result.percent ?? 0
  }
  get answers(){
    return this.result.answers?.sort( ( a, b ) => a.question > b.question ? 1: -1  ) ?? []
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
    return this.questions.filter( q => this.userTasksID.includes( q.id ) ) ?? []
  }

  get unAnsweredQuestionList(){
    return this.questions.filter( q => !this.userTasksID.includes( q.id )  ) ?? []
  }

  get answeredRightQuestionList(){
    return this.answeredQuestionList.filter( aq => {
      const userA = this.answers.find( uq => uq.question === aq.id )
      const rightA = rightAnswers.find( rq => rq.question === aq.id )
      return userA.question === rightA.question && userA.answer === rightA.answer
    },
    ) ?? []
  }

  get answeredWrongQuestionList(){
    return this.answeredQuestionList.filter( aq => {
      const userA = this.answers.find( uq => uq.question === aq.id )
      const rightA = rightAnswers.find( rq => rq.question === aq.id )
      return !( userA.question === rightA.question && userA.answer === rightA.answer )
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
    return rightAnswers.find( answ => answ.question === questNumb )
  }

}
</script>

<style scoped lang="sass" src="./AnsViewerView.sass">
</style>
