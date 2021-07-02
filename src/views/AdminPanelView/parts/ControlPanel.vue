<template lang="pug">
.control-panel
  .control-panel__page-changer
    ChangeArrow.back
    span.control-panel__page-number 1
    span.control-panel__page-number 2
    span.control-panel__page-number 3
    span.control-panel__page-number 4
    span.control-panel__page-number 5
    ChangeArrow.forward
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
export default class ControlPanel extends Vue{}
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
  &__page-number
    font-family: Inter, serif
    font-style: normal
    font-weight: normal
    font-size: 16px
    line-height: 19px
    margin: 0 10px
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
