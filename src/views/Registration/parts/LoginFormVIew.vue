<template lang="pug">
  .login-form-view
    .login-form-view__logo-items
      TestLogo
      STCLogo
    .login-form-view__title
      span Привет, начнем?
    .login-form-view__description-wrapper
      span.login-form-view__description {{ `Мы подготовили для вас тесты на языке C++. Они помогут&nbsp
        | нам оценить ваши знания, а вам - проверить свои.
        | \n На все вопросы у вас будет 1 час 30 минут, удачи` }}!

    form.login-form-view__login-form(@submit.prevent="onSubmitHandler")
      LoginFormInputView(
        v-for = "( item ) in objNames"
        :key= "item.index"
        :name = "item.name"
        :placeholder = "item.placeholder"
      )
      .login-form-view__account-exist( v-show = " errorLogin !== '' " )
        InfoLogo.login-form-view__logo
        p.login-form-view__text {{ errorLogin }}
      AppButton( name-of-button = "registration" ) Начать тестирование
    .login-form-view__contacts
      span Связаться с нами&nbsp
        span.login-form-view__contacts-email
          a.login-form-view__link(
            @click = "askToSendMail"
          ) ekorotkaia@stc-spb.ru
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import AppButton from '../../../components/AppButton.vue'
import LoginFormInputView from './LoginFormInputView.vue'
import { regExpEmail, regExpTelegram, regExpName } from '@/common/regexp/regexp'
import { testingModule } from '@/store'
import InfoLogo from '@/common/images/info.svg'
import STCLogo from '@/common/images/logo-stc.svg'
import TestLogo from '@/common/images/logo-test.svg'

@Component({
  components: {
    AppButton, LoginFormInputView,
    InfoLogo, STCLogo, TestLogo,
  },
})

export default class LoginFormView extends Vue {

  private objNames = [
    { name: 'name', placeholder: 'Имя*' }, { name: 'lastName', placeholder: 'Фамилия*' },
    { name: 'email', placeholder: 'Email*' }, { name: 'telegram', placeholder: 'Telegram' },
  ]

  get user(){
    return testingModule.getters.user
  }


  private emailValidate = regExpEmail
  private telegramValidate = regExpTelegram
  private nameValidate = regExpName

  get errorLogin(){
    return testingModule.getters.errorLogin
  }

  get isFetchedError(){
    return testingModule.getters.isShowFetchedError
  }

  private checkLoginDataCorrect(){
    const isCorrectEmail = this.user.email ? this.emailValidate.test( this.user.email ) : false
    const isCorrectTelegram = this.user.telegram && this.user.telegram !== '' ?
      this.telegramValidate.test( this.user.telegram ) : true
    const isCorrectLastName = this.user.name ? this.nameValidate.test( this.user.lastName ) : false
    const isCorrectName = this.user.lastName ? this.nameValidate.test( this.user.name ) : false

    return !!this.user.name && !!this.user.email && !!this.user.lastName && isCorrectEmail
      && isCorrectTelegram && isCorrectLastName && isCorrectName
  }

  private async onSubmitHandler() {
    if (this.isLoginDataCorrect) {
      const checkResult = this.checkLoginDataCorrect()
      if (checkResult) {
        const userData = this.user.telegram === '' || !this.user.telegram ?
          { name: this.user.name, lastName: this.user.lastName, email: this.user.email } :
          this.user
        const result = await testingModule.actions.fetchUser({ user: userData })
        if (!this.errorLogin) {

          if (result) {
            await testingModule.mutations.setTimeRemainLocalStorage(5400)
            localStorage.setItem('timeStart', (Math.floor(Date.now() / 1000)).toString())
            await testingModule.mutations.setIsAuthorized(true)
            await testingModule.mutations.setIsIncorrectFormData(true)
            await this.$router.push('/questions/1')
            await testingModule.mutations.setTimeRemain()

          }

        }


      } else {
        await testingModule.mutations.setIsIncorrectFormData(true)
      }
      localStorage.userGUID = testingModule.getters.answers.userGUID
    }
  }

  private askToSendMail( event: any ){
    const result = confirm( 'Отправить сообщение на электронный адрес ekorotkaia@stc-spb.ru?' )
    if( result ) {
      event.target.href = 'mailto:ekorotkaia@stc-spb.ru'
    } else {
      event.target.href = ''
    }
  }
}

</script>

<style scoped lang="sass" src="./LoginFormView.sass">
</style>
