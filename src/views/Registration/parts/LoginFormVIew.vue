<template lang="pug">
  .login-form-wrapper
    .title-wrapper
      span Привет, начнем?
    .description-wrapper
      span.description {{ `Мы подготовили для вас тесты на языке C++. Они помогут&nbsp
        | нам оценить ваши знания, а вам проверить свои.
        | \n На все вопросы у вас будет 1 час 30 минут, удачи` }}!
    .login-form
      form(@submit.prevent="onSubmitHandler")
        login-form-input-view(
          v-for = "(item, index) in objNames"
          :key= "item.index"
          :name = "item.name"
          :placeholder = "item.placeholder"
        )
        .account-exist(
          v-if="isAccountExist"
        )
          InfoLogo.__logo
          p.__text Данные email и telegram уже зарегистрированы, введите другие данные
        app-button(name-of-button = "registration") Начать тестирование
    .contacts
      span Связаться с нами&nbsp
        span.contacts-email
          a.__link(

            @click = "askToSendMail"
          ) ekorotkaia@stc-spb.ru
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import AppButton from '../../../components/AppButton.vue'
import LoginFormInputView from './LoginFormInputView.vue'
import { regExpEmail, regExpTelegram } from '@/common/regexp/regexp'
import { commonModule } from '@/store'
import InfoLogo from './../../../../src/common/images/info.svg'

@Component({
  components: {
    AppButton, LoginFormInputView, InfoLogo,
  },
})

export default class LoginFormView extends Vue {

  private objNames = [
    { name: 'name', placeholder: 'Имя*' }, { name: 'lastName', placeholder: 'Фамилия*' },
    { name: 'email', placeholder: 'Email*' }, { name: 'telegram', placeholder: 'Telegram*' },
  ]

  private user = commonModule.getters.user


  private emailValidate = regExpEmail
  private telegramValidate = regExpTelegram

  get isAccountExist(){
    return commonModule.getters.isAccountExist
  }

  private async onSubmitHandler(){
    const isCorrectEmail = this.user.email ? this.emailValidate.test( this.user.email ) : false
    const isCorrectTelegram = this.user.telegram ? this.telegramValidate.test( this.user.telegram ) : false
    if ( !!this.user.name && !!this.user.email && !!this.user.lastName && isCorrectEmail
      && isCorrectTelegram && !!this.user.telegram ) {
      const result = await commonModule.actions.fetchUser({ user: this.user })
      if( result ) {
        await commonModule.mutations.setIsAuthorized( true )
        await commonModule.mutations.setIsAccountExist( false )
        await commonModule.mutations.setTimeRemain()
        await this.$router.push( '/questions/1' )
      } else {
        await commonModule.mutations.setIsAccountExist( true )
      }
    } else {
      commonModule.mutations.setIsIncorrectFormData( true )
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

  .account-exist
    display: flex
    font-size: 14px
    font-family: Roboto, serif
    align-items: center
    width: 70%
    justify-content: space-between
    .__logo
      width: 16px
    .__text
      color: #757575
      width: 90%

  .contacts
    position: absolute
    bottom: 0
    padding-bottom: 10px
    font: $main-text-style

    .contacts-email
      text-decoration: underline
      .__link
        color: black
        &:visited
          color: black

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
