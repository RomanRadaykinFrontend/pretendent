<template lang="pug">
.modal
  .modal__overlay
    .modal__container( v-on-clickaway="onClose" )
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { directive as onClickaway } from 'vue-clickaway'

@Component({ directives: { onClickaway } })

export default class AppModal extends Vue {

  private onClose(): void {
    this.$emit( 'close' )
  }

}

</script>

<style lang="sass" scoped>
.modal
  &__overlay
    position: fixed
    z-index: 1000001
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: flex
    align-items: center
    justify-content: center
    transition: opacity 0.3s ease

  &__container
    margin: 0 auto
    padding: 20px 30px
    background-color: #fff
    border-radius: 2px
    box-shadow: 0 15px 35px #5d5b5b
    transition: all 0.3s ease
</style>
