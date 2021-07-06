<template lang="pug">
.control-panel
  .control-panel__page-changer
    ChangeArrow( @click = "decrementPage" ).back
    span.control-panel__page-number(
      v-for = " (page, index) in pageArr "
      :key = " page "
      :class = "getSpanClass( page )"
    ) {{ page }}
    ChangeArrow( @click = "incrementPage" ).forward
  .control-panel__count-changer
    p.control-panel__count-text На странице
    select.control-panel__select-count
      option 10
      option 20
      option 30
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangeArrow from '@/common/images/changeArrow.svg'

@Component({
  components: {
    ChangeArrow,
  },
})
export default class ControlPanel extends Vue{

  private currentPage = 1

  private pageArr = [ 1, 2, 3, 4, 5 ]

  private incrementPage(){
    debugger
    return this.currentPage < 5 ? this.currentPage += 1 : 5
  }
  private decrementPage(){
    return this.currentPage > 1 ? this.currentPage -= 1 : 1
  }

  private getSpanClass( page: number ){
    if( this.currentPage === page ){
      return 'span-bold'
    }
  }

}
</script>

<style scoped lang="sass">
.control-panel
  display: flex
  justify-content: space-between
  align-items: center
  &__page-changer, &__count-changer
    display: flex
    justify-content: space-between
    align-items: center
    .forward
      transform: rotate(180deg)
    .forward, .back
      cursor: pointer
  &__page-number
    font-family: Inter, serif
    font-style: normal
    font-weight: normal
    font-size: 16px
    line-height: 19px
    margin: 0 10px
    cursor: pointer
    &.span-bold
      font-weight: bold
  &__count-text
    font-family: Roboto, serif
    font-style: normal
    font-weight: normal
    font-size: 13px
    line-height: 16px
    margin-right: 20px
  &__select-count
    padding: 4px 8px
    outline: none
    border: 1px solid #D2D4D6
    background: rgba(255, 255, 255, 0.6)

</style>
