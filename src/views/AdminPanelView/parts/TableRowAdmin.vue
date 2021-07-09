<template lang="pug">
.table-row
  TableCellAdmin(
    :value = "rowNumb"
  )
  TableCellAdmin(
    :value = "userInfo.name"
  )
  TableCellAdmin(
    :value = "userInfo.lastName"
  )
  TableCellAdmin(
    :value = "userPercent"
    :id = "rowNumb"
    type = "percent"
  )
  TableCellAdmin(
    :value = "userInfo.email"
  )
  TableCellAdmin(
    :value = "userInfo.telegram"
  )
  TableCellAdmin(
    :value = "actualDate"
  )

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableCellAdmin from '@/views/AdminPanelView/parts/TableCellAdmin.vue'
import { UserResult } from '@/services/api'
import { getDate } from '@/helpers/functions'

@Component({
  components: { TableCellAdmin },
})
export default class TableRowAdmin extends Vue{
  @Prop() private tableValue!: UserResult
  @Prop() private rowNumb!: number

  get userInfo(){
    return this.tableValue.user
  }

  get userPercent(){
    return this.tableValue.percent
  }

  get actualDate(){
    return getDate( this.userInfo?.timeCreate || new Date() )
  }

}
</script>

<style scoped lang="sass">
.table-row
  display: table-row
  font-family: Roboto, serif
  font-style: normal
  font-weight: normal
  font-size: 16px
  color: black
</style>
