<template lang="pug">
.admin-panel-view
  h1.admin-panel-view__title Администрирование
  .admin-panel-view__table
    .admin-panel-view__table-body
      TableRow(
        :is-header-row = "true"
        :table-value = "headerRow"
      )
      TableRow(
        :table-value = "dataRow"
      )
      TableRow(
        :table-value = "dataRow"
      )
      TableRow(
        :table-value = "dataRow"
      )
  ControlPanel

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TableRow from '@/views/AdminPanelView/parts/TableRow.vue'
import ControlPanel from '@/views/AdminPanelView/parts/ControlPanel.vue'

@Component({
  components: {
    ControlPanel,
    TableRow,
  },
})
export default class AdminPanelView extends Vue{

  private headerRow = [ '#', 'Имя', 'Фамилия', 'Правильных ответов',
    'Email', 'Telegram', 'Дата прохождения', 'Время прохождения' ]

  private dataRow = [ '1', 'Иван', 'Иванов', { count: 28, needRef: true }, 'ivan@mail.ru', '@ivan313', '15.07.2021', '59:31' ]

}
</script>

<style scoped lang="sass">
.admin-panel-view
  display: flex
  flex-direction: column
  padding: 30px
  &__title
    font-family: Inter, serif
    font-style: normal
    font-weight: 600
    font-size: 24px
    line-height: 29px
    color: #2D2F33
    margin: 0
  &__table
    display: table
    width: 100%
    margin: 40px 0
  &__table-body
    display: table-row-group

</style>
