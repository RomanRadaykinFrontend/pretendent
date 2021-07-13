<template lang="pug">
.confirm-dialog
  AppModal
    .modal-header
      .modal-header__text
        h3 {{ dialogParams.header }}
      .modal-header__close-button(@click="hideModal" )
        include ../common/assets/icons/close
    .form
      .confirm-dialog__body
          .body-item
            .body-item__header
              h2 Домен:
            .body-item__content  {{ dialogParams.domain }}
          .body-item( v-if="showGroup" )
            .body-item__header
              h2 Группа:
            .body-item__content {{ dialogParams.group }}
          .body-item( v-if="showUser" )
            .body-item__header
              h2 Логин:
            .body-item__content {{ dialogParams.user }}
      .confirm-dialog__buttons
        button.btn-ok(
          @click="confirm"
        ) {{ dialogParams.buttonCaption }}
        button.btn-cancel(
          @click="hideModal"
          type="submit"
        ) Отмена
</template>

<script lang="ts">
import AppModal from './common/AppModal.vue'
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { DialogStatus } from './../services/helpers/userpermissions'

@Component({ components: { AppModal } })
export default class ConfirmDialog extends Vue {
  @PropSync('modalOpen', { type: Boolean }) private open!: boolean
  @PropSync('params', { type: Object }) private dialogParams!: any

  get showGroup() {
    return [DialogStatus.DELETE_GROUP, DialogStatus.DELETE_GROUP_USER].includes(this.dialogParams.status)
  }

  get showUser() {
    return [
      DialogStatus.BLOCK_USER,
      DialogStatus.DELETE_USER,
      DialogStatus.UNBLOCK_USER,
      DialogStatus.DELETE_GROUP_USER,
    ].includes(this.dialogParams.status)
  }

  private hideModal() {
    this.open = false
  }

  private confirm() {
    this.$emit('confirm')
    this.open = false
  }
}
</script>

<style lang="sass" scoped>
@import "../common/assets/styles/common"
@import "../common/assets/styles/form"
@import "../common/assets/styles/modal"
.form
  width: 300px

.confirm-dialog
  &__body
    .body-item
      display: flex
      &__content
        margin-left: 5px
        width: calc( 100% - 5px )
        text-overflow: ellipsis
        overflow: hidden
    & > *
      margin-bottom: 15px
      &:last-child
        margin-bottom: 30px
  &__buttons
    display: flex
    justify-content: flex-end

.btn
  &-ok
    width: max-content
    background: #CD040A
    border: 0px
    color: white
    border-radius: 5px
    padding: 6px 10px
    font-size: 15px
    &:hover
      box-shadow: 0 0 5px rgba(0,0,0,0.5)

  &-cancel
    width: 100px
    background: #2F3855
    border: 0px
    color: white
    border-radius: 5px
    padding: 6px 10px
    margin-left: 10px
    font-size: 15px
    &:hover
      box-shadow: 0 0 5px rgba(0,0,0,0.5)
</style>
