<template lang="pug">
.admin-header( :class = "adminHeaderClass" )
  button.admin-header__button(
    @click = "clickAction"
    v-show = "isAdmin"
  ) {{ buttonName }}
  button(@click="show") dawdaw
  UserPanel(
    @logout = "logout"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { decodeJSON, getFromStorage, UserFull, UserPanel } from '../../packages/login-form'
import { StoreKeys } from '../../packages/login-form/src/auth/services/helpers'

@Component({
  components: {
    UserPanel,
  },
})
export default class AdminHeader extends Vue{
  @Prop() private buttonName!: string

  private userData: UserFull = decodeJSON( getFromStorage( StoreKeys.USER ) )
  private permit: any = decodeJSON( getFromStorage( StoreKeys.PERMITS ) )

  private logout(){
    window.localStorage.removeItem( 'token' )
  }

  private clickAction(){
    this.$emit( 'click-button' )
  }

  private show(){
    console.log( this.permit )
  }

  get isAdmin(){
    return this.userData.login === 'admin'
  }

  get adminHeaderClass(){
    return {
      ['without-button']: !this.isAdmin,
    }
  }
}
</script>

<style scoped lang="sass">
.admin-header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 10px 0

  &__button
    padding: 0
    color: #1A8BDB
    font-family: Inter, serif
    font-style: normal
    font-weight: 600
    font-size: 16px
    border: none
    outline: none
    background: none
    cursor: pointer

  &.without-button
    justify-content: flex-end
</style>
