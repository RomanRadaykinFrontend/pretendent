<template lang="pug">
  .arrow-icon
    .arrow-icon__default-up(v-show="type === 'default'")
    .arrow-icon__default-down(v-show="type === 'default'")
    .arrow-icon__range__down(v-show="type === 'desc'")
    .arrow-icon__range__up(v-show="type === 'asc'")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AppFilterArrow extends Vue{
  @Prop() private type!: 'asc' | 'desc' | 'default'

}
</script>

<style scoped lang="sass">
@import './../../common/assets/styles/filter-arrows'
.arrow-icon
  cursor: pointer
  width: 5%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  &__range__up
    @include arrow(5px, 0deg)
    border-bottom: 5px solid black
  &__range__down
    @include arrow(5px, 180deg)
    border-bottom: 5px solid black
  &__default-up
    @include arrow(3px, 0deg)
    border-bottom: 3px solid black
    margin-bottom: 1px
  &__default-down
    @include arrow(3px, 180deg)
    border-bottom: 3px solid black
    margin-top: 1px
</style>