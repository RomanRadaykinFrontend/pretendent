<template lang="pug">
.admin-header( :class = "adminHeaderClass" )
  button.admin-header__button(
    @click = "clickAction"
    v-if = "isAdmin"
  ) {{ buttonName }}
  UserPanel(
    @logout = "logout"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { decodeJSON, getFromStorage, UserFull, UserPanel } from '../../packages/login-form'
import { StoreKeys } from '../../packages/login-form/src/auth/services/helpers'
import { namespace } from 'vuex-class'

const AS = namespace( 'authStore' )

@Component({
  components: {
    UserPanel,
  },
})
export default class AdminHeader extends Vue{
  @Prop() private buttonName!: string

  @AS.Getter( 'user' ) private user!: UserFull

  private logout(){
    window.localStorage.removeItem( 'token' )
  }

  private clickAction(){
    this.$emit( 'click-button' )
  }

  get isAdmin(){
    const res = this.user?.kv?.find( item => item.key === 'secure_okauth_admin' ) ?? false
    console.log( res )
    return res
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
