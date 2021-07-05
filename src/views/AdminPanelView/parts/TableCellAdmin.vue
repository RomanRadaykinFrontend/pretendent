<template lang="pug">
.table-cell-admin
  span.table-cell-admin__span(
    v-show = " typeof value === 'string' "
  ) {{ value }}
  RouterLink.table-cell-admin__ref(
    v-show = " value.count "
    to = "/answersviewer/:id"
  ) {{ value.count }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TableCellAdmin extends Vue{
  @Prop() private value!: any
}
</script>

<style scoped lang="sass">
.table-cell-admin
  padding: 15px
  box-sizing: border-box
  display: table-cell
  border: 1px solid rgba(198, 209, 221, 0.5)

  &__ref
    color: #1A8BDB
    text-decoration: none
    &:visited
      color: #1A8BDB
</style>
