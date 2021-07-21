<template lang="pug">
.table-cell-admin
  .table-cell-admin__name
    span.table-cell-admin__span(
      v-show = " value.name "
    ) {{ value.name }}
    SortArrowLogo.logo(
      :class = "sortArrowClass"
      v-show = " value.needSort "
      @click = "startSort"
    )
  RouterLink.table-cell-admin__ref(
    v-show = " value.count "
    to = "/answersviewer/:id"
  ) {{ value.count }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SortArrowLogo from '@/common/images/sort-arrow.svg'

@Component({
  components: {
    SortArrowLogo,
  },
})
export default class AppHeaderTableCell extends Vue{
  @Prop() private value!: any

  private sortDirection = true

  private startSort(){
    this.sortDirection = !this.sortDirection
    if( this.value.sortType === 'byPercent' ){
      this.$emit( 'sort-by-percent', this.sortDirection )
    } else if( this.value.sortType === 'byDate' ){
      this.$emit( 'sort-by-date', this.sortDirection )
    } else {
      this.$emit( 'sort-by-id', this.sortDirection )
    }
  }

  get sortArrowClass(){
    return this.sortDirection ? 'desc' : 'asc'
  }
}
</script>

<style scoped lang="sass">
.table-cell-admin
  padding: 15px
  box-sizing: border-box
  display: table-cell
  border: 1px solid rgba(198, 209, 221, 0.5)
  width: 5%

  &__name
    display: flex
    justify-content: space-between
    align-items: center
    .logo
      cursor: pointer
    .desc
      transform: rotate(0deg)
    .asc
      transform: rotate(180deg)
  &__ref
    color: #1A8BDB
    text-decoration: none
    &:visited
      color: #1A8BDB
</style>
