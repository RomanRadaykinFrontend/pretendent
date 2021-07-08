<template lang="pug">
.admin-panel-view
  h1.admin-panel-view__title Администрирование
  .admin-panel-view__table
    .admin-panel-view__table-body
      AppHeaderTableRow(
        :is-header-row = "true"
        :table-value = "headerRow"
        @sort-by-date = " sortByDate( $event ) "
        @sort-by-percent = " sortByPercent( $event ) "
      )
      TableRowAdmin(
        v-for = " ( result, index ) in results "
        :key = "index"
        :table-value = "result"
        :row-numb = " rowNumb + index + 1 "
      )
  ControlPanel(
    @change-count-result = "changeResultsCount( $event )"
    @to-current-page = " getNewUsersList ( $event )  "
    @to-next-page = " getNewUsersList ( $event ) "
    @to-previous-page = " getNewUsersList ( $event ) "
    :results-count = " resultsCount "
    :total-count = " totalCount "
  )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeaderTableRow from '@/components/AppHeaderTableRow.vue'
import ControlPanel from '@/views/AdminPanelView/parts/ControlPanel.vue'
import TableRowAdmin from '@/views/AdminPanelView/parts/TableRowAdmin.vue'
import { adminModule } from '@/store'
import { sortItems } from '@/helpers/functions'

@Component({
  components: {
    ControlPanel,
    AppHeaderTableRow,
    TableRowAdmin,
  },
})
export default class AdminPanelView extends Vue{

  get results(){
    return adminModule.getters.results
  }

  get resultsCount(){
    return adminModule.getters.resultsCount
  }

  get totalCount(){
    return adminModule.getters.totalCount
  }

  get page(){
    return adminModule.getters.page
  }

  get rowNumb(){
    return 0
  }

  private headerRow = [
    { name: '#', needSort: false },
    { name: 'Имя', needSort: false },
    { name: 'Фамилия', needSort: false },
    { name: 'Правильных ответов', needSort: true, sortType: 'byPercent' },
    { name: 'Email', needSort: false },
    { name: 'Telegram', needSort: false },
    { name: 'Дата прохождения', needSort: true, sortType: 'byDate' },
  ]

  private sortByPercent( direction: boolean ){
    return this.results.sort( ( a, b ) => sortItems( a.percent, b.percent, direction ) )

  }
  private sortByDate( direction: boolean ){
    console.log( this.results )
    return this.results.sort( ( a, b ) => sortItems( a.user.timeCreate, b.user.timeCreate, direction ) )
  }

  private mounted(){
    adminModule.actions.getResults({ offset: 0, limit: +this.resultsCount })
  }

  private changeResultsCount( resultsCount: number  ){
    adminModule.mutations.setResultsCount( resultsCount.toString() )
    adminModule.actions.getResults({ offset: 0, limit: resultsCount })
  }

  private getNewUsersList( page: number ){
    const newOffset = ( page * this.resultsCount ) - +this.resultsCount
    adminModule.actions.getResults({ offset: newOffset, limit: +this.resultsCount })
    adminModule.mutations.setPage( page )
  }

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
    table-layout: fixed
  &__table-body
    display: table-row-group

</style>
