<template lang="pug">
.admin-header
  button( @click = "clickAction" ) {{ buttonName }}
  UserPanel(
    @logout = "logout"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserPanel } from '../../packages/login-form'

@Component({
  components: {
    UserPanel,
  },
})
export default class AdminHeader extends Vue{
  @Prop() private buttonName!: string
  private logout(){
    window.localStorage.removeItem( 'token' )
  }

  private clickAction(){
    this.$emit( 'click-button' )
  }
}
</script>

<style scoped lang="sass">
.admin-header
  display: flex
  justify-content: space-between
  padding: 10px 35px
</style>
