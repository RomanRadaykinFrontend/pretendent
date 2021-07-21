<template lang="pug">
  .blank-background-view
    DisclaimerLogo.logo
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DisclaimerLogo from '@/common/images/disclaimer.svg'

@Component({
  components: {
    DisclaimerLogo
  }
})
export default class BlankBackgroundView extends Vue {}

</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
.blank-background-view
  background-color: white
  background-image: url("../../../common/images/blank.png")
  background-repeat: no-repeat
  background-position: center
  background-size: contain
  width: 100%
  height: 100%
  display: flex
  justify-content: flex-end
  align-items: flex-end
  border-radius: 0px 24px 24px 0px
  .logo
    padding: 20px

</style>
