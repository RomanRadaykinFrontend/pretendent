<template lang="pug">
.control-panel
  .control-panel__page-changer
    ChangeArrow( @click = "decrementPage" ).back
    span.control-panel__page-number(
      v-for = " (page, index) in actualCountPages "
      :key = " page "
      :class = " currentPage === page ? 'span-bold' : '' "
      @click = " goToCurrentPage( page.toString() ) "
    ) {{ page }}
    ChangeArrow( @click = "incrementPage" ).forward
  .control-panel__count-changer
    p.control-panel__count-text На странице
    select(
      v-model = "pickedCount"
      @change = "$emit('change-count-result', pickedCount)"
    ).control-panel__select-count
      option( value="10" selected ) 10
      option( value="20" ) 20
      option( value="30" ) 30
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ChangeArrow from '@/common/images/changeArrow.svg'


@Component({
  components: {
    ChangeArrow,
  },
})
export default class ControlPanel extends Vue{
  @Prop() private resultsCount!: number
  @Prop() private totalCount!: number
  @Prop() private currentPage!: number | string

  private pickedCount = this.resultsCount

  get actualCountPages(){
    return Math.ceil( this.totalCount / +this.pickedCount ).toString()
  }

  private incrementPage(){
    const currentPage = +this.currentPage + 1
    const newPage = this.currentPage < this.actualCountPages ? currentPage  : this.actualCountPages
    this.$emit( 'to-next-page', newPage )
    return newPage
  }
  private decrementPage(){
    const currentPage = +this.currentPage - 1
    const newPage = this.currentPage > 1 ? currentPage : 1
    this.$emit( 'to-previous-page', newPage )
    return newPage
  }

  private goToCurrentPage( page: string ){
    this.$emit( 'to-current-page', page )
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
