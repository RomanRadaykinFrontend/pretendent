<template lang="pug">
  .login-form-wrapper
    .title-wrapper
      span Привет, начнем?
    .description-wrapper
      span.description {{ `Мы подготовили для вас тесты на языке C++. Они помогут&nbsp
        | нам оценить ваши знания, а вам проверить свои.
        | \n На вопросы у вас будет 1 час 30 минут, удачи` }}!
    .login-form
      form(@submit.prevent="onSubmitHandler")
        login-form-input-view(
          placeholder = "Имя*"
          name = "name"
          @get-text = "setUserData"
        )
        login-form-input-view(
          placeholder = "Фамилия*"
          name = "lastName"
          @get-text = "setUserData"
        )
        login-form-input-view(
          placeholder = "Email*"
          name = "email"
          @get-text = "setUserData"
        )
        login-form-input-view(
          placeholder = "Telegram*"
          name = "telegram"
          @get-text = "setUserData"
        )
        app-button(name-of-button = "registration") Начать тестирование
    .contacts
      span Связаться с нами&nbsp
        span.contacts-email ekorotkaia@stc-spb.ru
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import AppButton from '../../../components/AppButton.vue'
import LoginFormInputView from './LoginFormInputView.vue'
import { regExpEmail } from '@/common/regexp/regexp'
import { commonModule } from '@/store'


@Component({
  components: {
    AppButton, LoginFormInputView,
  },
})

export default class LoginFormView extends Vue {

  private user = commonModule.getters.user
  private setUserData = commonModule.mutations.setUser

  private emailValidate = regExpEmail

  private async onSubmitHandler(){
    const isCorrectEmail = this.user.email ? this.emailValidate.test( this.user.email ) : false
    if ( !!this.user.name && !!this.user.email && !!this.user.lastName && isCorrectEmail && !!this.user.telegram ) {
      const result = await commonModule.actions.fetchUser({ user: this.user })
      if( result ) {
        await this.$router.push( '/questions/1' )
      }
    } else {
      commonModule.mutations.setIsIncorrectFormData( true )
    }
  }

}

</script>

<style scoped lang="sass">
@import '../../../common/assets/common'
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
    padding: 10px 0
    font: $main-text-style

    .contacts-email
      text-decoration: underline

@media screen and (max-width: 1400px)
  .login-form-wrapper
    width: 65%

@media screen and (max-width: 1200px)
  .login-form-wrapper
    width: 100%
    margin-top: 100px
    height: auto
    justify-content: flex-start
    position: relative
    .contacts
      bottom: -100px
      padding: 30px 0
</style>
