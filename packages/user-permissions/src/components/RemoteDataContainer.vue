<template lang="pug">
.remote-data-container
    .remote-data-wrapper( :class="wrapperClass" )
        slot
    .remote-data-spinner( v-show="loading" )
        .spinner__circle
        .spinner__circle
        .spinner__circle
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RemoteDataStatus, DropDownItem } from '../types/common'

@Component
export default class RemoteDataContainer extends Vue {
  @Prop() public status!: RemoteDataStatus

  get loading() {
    return this.status === RemoteDataStatus.PENDING
  }


  get wrapperClass() {
    switch ( this.status ) {
    case RemoteDataStatus.SUCCESS: return 'data-success'
    case RemoteDataStatus.UNLOAD_SUCCESS: return 'data-success'
    case RemoteDataStatus.PENDING: return 'data-loading'
    case RemoteDataStatus.ERROR: return 'data-error'
    case RemoteDataStatus.ERROR_NO_BG: return 'data-error-no-bg'
    case RemoteDataStatus.UNLOAD_ERROR: return 'data-error-no-bg'
    default: return 'data-init'
    }
  }
}
</script>

<style lang="sass" scoped>
.remote-data-container,
.remote-data-wrapper
    width: 100%
    height: 100%
.remote-data-container
    position: relative
.remote-data-spinner
    position: absolute
    top: calc(50% - 28px)
    left: calc(50% - 11px)
.spinner__circle
    background-color: #11203c
    height: 15px
    width: 15px
    margin: 2px
    border-radius: 100%
    -webkit-animation: beatDelayAnimation 0.7s infinite linear
            animation: beatDelayAnimation 0.7s infinite linear
    -webkit-animation-fill-mode: both
            animation-fill-mode: both
    display: inline-block

    &::nth-of-type(odd)
        animation-delay: 0s
    &:nth-of-type(even)
        animation-delay: 0.35s

.data-init
    opacity: 0.4
    filter: blur(1px)

.data-loading
    filter: blur(0)
    animation: data-loading 1.5s infinite
    animation-timing-function: cubic-bezier(.12,.78,.99,.57)
    transition: all 0.5s
    position: relative
    &::after
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        content: ' '
        z-index: 10000

.data-success, .data-error-no-bg
    opacity: 1

.data-error
    position: relative
    & > *
        filter: grayscale(1)
    &::after
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        content: ' '
        background: #11203cb0
@keyframes data-loading
    0%
        opacity: 0.4
    50%
        opacity: 0.8
    100%
        opacity: 0.4


@-webkit-keyframes beatDelayAnimation
    50%

        -webkit-transform: scale(0.75)
                transform: scale(0.75)
        -webkit-opacity: 0.2
                opacity: 0.2
    100%

        -webkit-transform: scale(1)
                transform: scale(1)
        -webkit-opacity: 1
                opacity: 1


@keyframes beatDelayAnimation
    50%

        -webkit-transform: scale(0.75)
                transform: scale(0.75)
        -webkit-opacity: 0.2
                opacity: 0.2

    100%
        -webkit-transform: scale(1)
                transform: scale(1)
        -webkit-opacity: 1
                opacity: 1

</style>
