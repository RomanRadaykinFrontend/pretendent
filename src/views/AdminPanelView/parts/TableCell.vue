<template lang="pug">
.table-cell
  span.table-cell__span(
    v-if = " typeof value === 'string' "
  ) {{ value }}
  a.table-cell__ref(
    href="#"
    v-else
  ) {{ value.count }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TableCell extends Vue{
  @Prop() private value!: string | { count: string, needRef: boolean }


}
</script>

<style scoped lang="sass">
.table-cell
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
