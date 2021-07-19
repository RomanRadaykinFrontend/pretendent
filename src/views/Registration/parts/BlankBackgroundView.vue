<template lang="pug">
  .blank-background-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BlankBackgroundView extends Vue {}

</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.blank-background-view
  background-color: rgb(250, 250, 252)
  background-image: url("../../../common/images/blank.png")
  background-repeat: no-repeat
  background-position: center
  background-size: auto
  width: 100%
  height: 100%

@media screen and (max-width: 1500px)
  .blank-background-view
    background-size: 70%
</style>
