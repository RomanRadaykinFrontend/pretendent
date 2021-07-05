<template lang="pug">
.table-row( :class = "rowClass" )
  TableCellAdmin(
    v-for = "(cell,index) in tableValue"
    :key = "index"
    :value = "cell"
  )

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableCellAdmin from '@/views/AdminPanelView/parts/TableCellAdmin.vue'

@Component({
  components: { TableCellAdmin },
})
export default class TableRowAdmin extends Vue{
  @Prop({ default: false }) private isHeaderRow!: boolean
  @Prop() private tableValue!: Array<any>

  get rowClass(){
    return {
      ['header-row']: this.isHeaderRow,
    }
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
  &.header-row
    background: rgba(240, 242, 244, 0.5)
    color: #7B8395
    font-weight: 500
    font-size: 12px
</style>
