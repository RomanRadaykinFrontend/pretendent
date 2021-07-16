<template lang="pug">
.admin-panel-view(  :class = "adminPanelViewClass" )
  VueSimpleSpinner.spinner(
    size = "huge"
    v-if = " isAllDataFetched "
  )
  AdminHeader(
    @click-button = "goToUserPerm"
    button-name = "Задать роли"
  )
  .admin-panel-view__header-wrapper
    .admin-panel-view__header(
      v-if = " !isAllDataFetched "
    )
      h1.admin-panel-view__title Администрирование
    .admin-panel-view__export(
      v-if = " !isAllDataFetched "
    )
      vue-excel-xlsx.admin-panel-view__export-button(
        :data = "dataExcel"
        :columns = "columnsExcel"
        filename = "table"
        sheetnam= "sheetname"
      )
        SortArrowLogo
        | Скачать .xls
  .admin-panel-view__table(
    v-if = " !isAllDataFetched "
  )
    .admin-panel-view__table-body
      AppHeaderTableRow(
        :is-header-row = "true"
        :table-value = "headerRow"
        @sort-by-date = " sortByDate( $event ) "
        @sort-by-percent = " sortByPercent( $event ) "
      )
      TableRowAdmin(
        v-for = " ( result, index ) in actualResults "
        :key = "index"
        :table-value = "result"
        :row-numb = " result.id  "
      )
  ControlPanel(
    @change-count-result = "changeResultsCount( $event )"
    @to-current-page = " getNewUsersList ( $event )  "
    @to-next-page = " getNewUsersList ( $event ) "
    @to-previous-page = " getNewUsersList ( $event ) "
    :results-count = " resultsCount "
    :total-count = " totalCount "
    :current-page = "page"
    v-if = " !isAllDataFetched "
  )


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeaderTableRow from '@/components/AppHeaderTableRow.vue'
import ControlPanel from '@/views/AdminPanelView/parts/ControlPanel.vue'
import TableRowAdmin from '@/views/AdminPanelView/parts/TableRowAdmin.vue'
import { adminModule } from '@/store'
import { getDate, sortItems } from '@/helpers/functions'
import SortArrowLogo from '@/common/images/sort-arrow.svg'
import { DataExcel } from '@/types/common'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueSimpleSpinner from 'vue-simple-spinner'
import AdminHeader from '@/views/AdminHeader.vue'

@Component({
  components: {
    AdminHeader,
    ControlPanel,
    AppHeaderTableRow,
    TableRowAdmin,
    SortArrowLogo,
    VueSimpleSpinner,
  },
})
export default class AdminPanelView extends Vue{

  private columnsExcel = [
    {
      label: '#',
      field: 'id',
    },
    {
      label: 'Имя',
      field: 'name',
    },
    {
      label: 'Фамилия',
      field: 'lastName',
    },
    {
      label: 'Правильных ответов',
      field: 'percent',
    },
    {
      label: 'Email',
      field: 'email',
    },
    {
      label: 'Telegram',
      field: 'telegram',
    },
    {
      label: 'Дата прохождения',
      field: 'date',
    },
  ]


  get dataExcel(){
    return this.results.map( ( res, idx ) => {
      const newObj = {} as DataExcel
      newObj.id = idx + 1
      newObj.name = res.user?.name ?? ''
      newObj.lastName = res.user?.lastName ?? ''
      newObj.percent = res.percent ?? 0
      newObj.email = res.user?.email ?? ''
      newObj.telegram = res.user?.telegram ?? ''
      newObj.date = getDate( res.user?.timeCreate ) ?? ''
      return newObj
    })
  }

  get results(){
    return adminModule.getters.results
  }

  get adminPanelViewClass(){
    return{
      ['show-spinner']: this.isAllDataFetched,
    }
  }

  get actualResults(){
    return this.results.slice( +this.resultsCount * this.page - +this.resultsCount,
      +this.resultsCount * this.page )
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

  get isAllDataFetched(){
    return adminModule.getters.isAllDataFetched
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
    return this.results.sort( ( a, b ) => sortItems( a.user?.timeCreate, b.user?.timeCreate, direction ) )
  }

  private getPaginationResults(){
    return this.results.slice( +this.resultsCount * this.page - +this.resultsCount,
      +this.resultsCount * this.page )
  }

  private created(){
    adminModule.mutations.setPage( localStorage.getItem( 'page' ) ?? 1 )
    adminModule.actions.getResults({ offset: 0, limit: this.totalCount })
  }

  private changeResultsCount( resultsCount: number  ){
    adminModule.mutations.setPage( 1 )
    adminModule.mutations.setResultsCount( resultsCount.toString() )
    adminModule.actions.getResults({ offset: 0, limit: resultsCount })
  }

  private getNewUsersList( page: number ){
    adminModule.mutations.setPage( page )
    localStorage.setItem( 'page', page )
    return this.getPaginationResults()
  }

  private logout(){
    window.localStorage.removeItem( 'token' )
  }

  private goToUserPerm(){
    this.$router.push( '/userpermissions' )
  }
}
</script>

<style scoped lang="sass">
.admin-panel-view
  display: flex
  flex-direction: column
  padding: 30px

  &.show-spinner
    justify-content: center
    align-items: center
    height: 100%
  &__header
    display: flex
    justify-content: space-between

  &__header-wrapper
    display: flex
    justify-content: space-between
    align-items: center
    margin: 10px 0

  &__title
    font-family: Inter, serif
    font-style: normal
    font-weight: 600
    font-size: 24px
    line-height: 29px
    color: #2D2F33
    margin: 0

  &__export-button
    background: #F5F5F5
    border: 1px solid #D2D4D6
    padding: 8px 12px
    display: flex
    justify-content: space-between
    align-items: center
    width: 112px
    height: 32px
    cursor: pointer

  &__table
    display: table
    width: 100%
    margin: 20px 0
    table-layout: fixed
  &__table-body
    display: table-row-group

</style>
