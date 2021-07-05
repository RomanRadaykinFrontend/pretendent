<template lang="pug">
.table-cell-admin
  .table-cell-admin__name
    span.table-cell-admin__span(
      v-show = " value.name "
    ) {{ value.name }}
    SortArrowLogo.logo( v-show = " value.needSort " )
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
    SortArrowLogo
  }
})
export default class AppHeaderTableCell extends Vue{
  @Prop() private value!: any
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
  &__ref
    color: #1A8BDB
    text-decoration: none
    &:visited
      color: #1A8BDB
</style>
