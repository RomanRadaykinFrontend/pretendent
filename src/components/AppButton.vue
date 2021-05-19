<template lang="pug">
  div
    button.button-common(
      :class="isPrimary ? 'is-primary' : 'is-secondary'"
      @click.prevent="clickOnButton"
    )
      slot
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { SET_PAGE } from '../store/mutation.types'

const CommonModule = namespace( 'commonModule' )

@Component

export default class AppButton extends Vue {
  @Prop({ default: true }) public isPrimary!: boolean

  @CommonModule.Mutation( SET_PAGE ) public setPage!: any

  clickOnButton(){
    this.setPage()
    this.$emit( 'button-action' )
  }
}

</script>

<style scoped lang="sass">
@import '../common/assets/common'
.button-common
  border: none
  height: 40px
  padding: 3px 20px
  margin-top: 30px
  border-radius: 5px
  font-size: 16px
  cursor: pointer
  font: $main-text-style

.is-primary
  background-color: $primary-color
  color: white

.is-secondary
  background-color: white
  color: $primary-color
</style>
