<template lang="pug">
.ans-viewer-view
  .ans-viewer-view__control-panel
    button( @click = " () => $router.push('/adminpanel')" ).ans-viewer-view__back-button Назад
    h1.ans-viewer-view__title Просмотр ответов
    select.ans-viewer-view__select
      option Все вопросы
      option Отвеченные вопросы
      option Неотвеченные вопросы
    .ans-viewer-view__about(
      v-for = " data in pretendData "
      :key = "data.title"
    )
      span.subtitle {{ data.title }}
      span.data {{ data.data }}


  .ans-viewer-view__table
    .ans-viewer-view__table-body
    AppHeaderTableRow(
      :is-header-row = "true"
      :table-value = "headerRow"
    )
    TableRowAnsw(
      v-for = "(question, index) in questions"
      :table-value = "question"
      :quest-number = "index + 1"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TableRowAnsw from '@/views/AnswersViewerView/parts/TableRowAnsw.vue'
import AppHeaderTableRow from '@/components/AppHeaderTableRow.vue'
import { questions } from '@/common/questions'

@Component({
  components: {
    TableRowAnsw, AppHeaderTableRow,
  },
})
export default class AnsViewerView extends Vue{
  private questions = questions
  private pretendData = [
    { title: 'Имя', data: 'Иванов Иван' },
    { title: 'Email', data: 'Ivan@mail.ru' },
    { title: 'Telegram', data: '@ivan3' },
    { title: 'Правильных ответов', data: '28 / 48' },
    { title: 'Дата прохождения', data: '12.05.2021' },
    { title: 'Время прохождения', data: '59:22' },
  ]

  private headerRow = [
    { name: 'Номер вопроса', needSort: true },
    { name: 'Вопрос', needSort: false },
    { name: 'Ответ', needSort: false }]

  private picked = ''

}
</script>

<style scoped lang="sass" src="./AnsViewerView.sass">
</style>
