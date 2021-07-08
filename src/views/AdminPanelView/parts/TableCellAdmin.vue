<template lang="pug">
.table-cell-admin
  span( v-show = " type === 'none' " ) {{ actualValue }}
  RouterLink.table-cell-admin__ref(
    v-show = "type === 'percent'"
    @click = " setUserID "
    :to = "ref"
  ) {{ actualValue + '%' }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { adminModule } from '@/store'

@Component
export default class TableCellAdmin extends Vue{
  @Prop() private value!: any
  @Prop({ default: 'none' }) private type!: string
  @Prop({ required: false }) private id!: string

  private setUserID(){
    adminModule.mutations.setUserID( this.id )
  }

  get actualValue(){
    return this.value
  }

  get ref(){
    return `/answersviewer/${this.id}`
  }
}
</script>

<style scoped lang="sass">
.table-cell-admin
  padding: 15px
  box-sizing: border-box
  display: table-cell
  border: 1px solid rgba(198, 209, 221, 0.5)
  word-wrap: break-word
  div
    width: 100%
    height: auto
  &__ref
    color: #1A8BDB
    text-decoration: none
    cursor: pointer
    &:visited
      color: #1A8BDB
</style>
