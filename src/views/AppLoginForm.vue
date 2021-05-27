<template lang="pug">
  .login-form-wrapper
    .title-wrapper
      span Привет, начнем?
    .description-wrapper
      span.description Мы подготовили для вас тесты на языке C++. Они помогут&nbsp
        | нам оценить ваши знания, а вам проверить свои :)
        | На каждый вопрос у вас будет 2 минуты, удачи!
    .login-form
      form(@submit.prevent="onSubmitHandler")
        login-form-input(
          placeholder="Имя*"
          name="name"
          @get-text="setUserData"
        )
        login-form-input(
          placeholder="Фамилия*"
          name="lastName"
          @get-text="setUserData"
        )
        login-form-input(
          placeholder="Email*"
          name="email"
          @get-text="setUserData"
        )
        login-form-input(
          placeholder="Telegram*"
          name="telegram"
          @get-text="setUserData"
        )
        app-button(name-of-button="registration") Начать тестирование
    .contacts
      span Связаться с нами&nbsp
        span.contacts-email alszhechkova@stc-spb.ru
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import AppButton from '../components/AppButton.vue'
import LoginFormInput from '../components/LoginFormInput.vue'
import { regExpEmail } from '@/common/regexp/regexp'
import { User, UsersCreateRequest } from '../../api'
import { InputName } from '@/types/common'
import { namespace } from 'vuex-class'
import { SET_USER } from '@/store/mutation.types'
import { FETCH_USER } from '@/store/action.types'

const CommonModule = namespace( 'commonModule' )

@Component({
  components: {
    AppButton, LoginFormInput,
  },
})

export default class AppLoginForm extends Vue {

  @CommonModule.Getter( 'user' ) public user!: User
  @CommonModule.Mutation( SET_USER ) public setUserData!: ( name: InputName, value: string ) => void
  @CommonModule.Action( FETCH_USER ) public fetchUser!: ( user: UsersCreateRequest ) => any

  public emailValidate = regExpEmail

  private async onSubmitHandler(){
    const isCorrectEmail = this.user.email ? this.emailValidate.test( this.user.email ) : false

    console.log( this.user )
    if ( !!this.user.name && !!this.user.email && !!this.user.lastName && isCorrectEmail ) {
      const result = await this.fetchUser({ user: this.user })
      if( result ) {
        await this.$router.push( '/questions/1' )
      }
    }
  }

}

</script>

<style scoped lang="sass">
@import '../common/assets/common'
.login-form-wrapper
  width: 57%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center

  .login-form
    form
      display: flex
      flex-direction: column
      align-items: flex-start

  .title-wrapper
    font: $header-text-style
    padding: 14px 0

  .description-wrapper
    padding-right: 30px
    font: $main-text-style
    line-height: 1.5

  .contacts
    margin-top: -50px
    position: absolute
    bottom: 0
    padding: 10px
    font: $main-text-style

    .contacts-email
      text-decoration: underline

@media screen and (max-width: 1400px)
  .login-form-wrapper
    width: 65%

@media screen and (max-width: 1200px)
  .login-form-wrapper
    width: 100%
</style>
