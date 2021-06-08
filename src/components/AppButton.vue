<template lang="pug">
    button.button-common(
      :class = "isPrimary ? 'is-primary' : 'is-secondary'"
      type = "submit"
    )
      slot
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppButton extends Vue {
  @Prop({ default: true }) public isPrimary!: boolean
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
  border: 1px solid $primary-color
</style>
