<template lang='pug'>
.app-checked-items
  .item(
    v-for="item in values"
    @click.stop="addItemToSelected( item )"
  )
    AppCheckBox(
      :value="isSelectedItem( item.value )"
      @change="addItemToSelected( item )"
    ) {{ item.name }}
</template>
<script lang='ts'>
import AppCheckBox from './AppCheckBox.vue'
import { DropDownItem } from '../../types/common'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: { AppCheckBox },
})
export default class AppCheckedItems extends Vue {
  @Prop({ default: () => [] }) public values!: Array<DropDownItem>
  @Prop({ default: () => [] }) public value!: Array<DropDownItem>
  @Prop({ default: false }) private disabled!: boolean

  private selectedItems: Array<DropDownItem> = []

  @Watch('value', { deep: true }) private onTest() {
    if ( this.value?.length ) {
      this.selectedItems = [ ...this.value ]
    }
  }

  private isSelectedItem( value: string ): boolean {
    return !!this.selectedItems.find( i => i.value === value )
  }

  // remove / add clicked item to selected items
  private addItemToSelected( item: DropDownItem ): void {
    // if item exist at selected - remove
    if ( this.selectedItems.find( i => i.value === item.value ) ) {
      this.selectedItems = this.selectedItems.filter( i => i.value !== item.value )
    } else {
      // add selected item to list
      this.selectedItems.push( item )
    }
    this.$emit( 'input', this.selectedItems )
  }

}
</script>


<style lang="sass" scoped>
@import "../../common/assets/styles/common"
.app-checked-items
  width: 100%
  height: 100%
  overflow-x: hidden
  @include custom-scroll-bar
  .item
    padding-top: 5px
    &:first-of-type
      padding-top: 0px
</style>
