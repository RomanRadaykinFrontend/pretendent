<template lang="pug">
  .login-form-view
    .login-form-view__title
      span Привет, начнем?
    .login-form-view__description-wrapper
      span.login-form-view__description {{ `Мы подготовили для вас тесты на языке C++. Они помогут&nbsp
        | нам оценить ваши знания, а вам проверить свои.
        | \n На все вопросы у вас будет 1 час 30 минут, удачи` }}!

    form.login-form-view__login-form(@submit.prevent="onSubmitHandler")
      LoginFormInputView(
        v-for = "( item ) in objNames"
        :key= "item.index"
        :name = "item.name"
        :placeholder = "item.placeholder"
      )
      .login-form-view__account-exist( v-show = "isAccountExist" )
        InfoLogo.login-form-view__logo
        p.login-form-view__text Данные email или telegram уже зарегистрированы, введите другие данные
      .login-form-view__account-exist( v-show = "isFetchedError" )
        InfoLogo.login-form-view__logo
        p.login-form-view__text Что-то пошло не так, повторите попытку позже.
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
  private nameValidate = regExpName

  get isAccountExist(){
    return commonModule.getters.isAccountExist
  }

  get errorLogin(){
    return commonModule.getters.errorLogin
  }

  get isFetchedError(){
    return commonModule.getters.isShowFetchedError
  }

  get isLoginDataCorrect(){
    const isCorrectEmail = this.user.email ? this.emailValidate.test( this.user.email ) : false
    const isCorrectTelegram = this.user.telegram ? this.telegramValidate.test( this.user.telegram ) : false
    const isCorrectLastName = this.user.name ? this.nameValidate.test( this.user.lastName ) : false
    const isCorrectName = this.user.lastName ? this.nameValidate.test( this.user.name ) : false

    return !!this.user.name && !!this.user.email && !!this.user.lastName && isCorrectEmail
      && isCorrectTelegram && isCorrectLastName && isCorrectName && !!this.user.telegram
  }

  private async onSubmitHandler(){
    if ( this.isLoginDataCorrect ) {
      const result = await commonModule.actions.fetchUser({ user: this.user })
      if ( !this.errorLogin ) {

        if( result ){
          await commonModule.mutations.setTimeRemainLocalStorage( 5400 )
          localStorage.setItem( 'timeStart', ( Math.floor( Date.now() / 1000 ) ).toString() )
          await commonModule.mutations.setIsAuthorized( true )
          await commonModule.mutations.setIsAccountExist( false )
          await commonModule.mutations.setIsIncorrectFormData( true )
          await this.$router.push( '/questions/1' )
          await commonModule.mutations.setTimeRemain()

        } else {
          await commonModule.mutations.setIsAccountExist( true )
        }
      } else {
        await commonModule.mutations.setIsShowFetchedError( true )
      }


    } else {
      await commonModule.mutations.setIsIncorrectFormData( true )
    }
    localStorage.userGUID = commonModule.getters.answers.userGUID
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
.login-form-view
  width: 57%
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center

  &__login-form
    display: flex
    flex-direction: column
    align-items: flex-start

  &__title
    font: $header-text-style
    padding: 14px 0

  &__description-wrapper
    padding-right: 30px
    font: $main-text-style
    line-height: 1.5

  &__account-exist
    display: flex
    font-size: 14px
    font-family: Roboto, serif
    align-items: center
    width: 70%
    justify-content: space-between
  &__logo
    width: 16px

  &__text
    color: #757575
    width: 90%

  &__contacts
    position: absolute
    bottom: 0
    padding-bottom: 10px
    font: $main-text-style

  &__contacts-email
    text-decoration: underline
  &__link
    color: black
    cursor: pointer
    &:visited
      color: black

@media screen and (max-width: 1400px)
  .login-form-view
    width: 65%

@media screen and (max-width: 1200px)
  .login-form-view
    width: 100%
    margin-top: 100px
    height: auto
    justify-content: flex-start
    position: relative
    &__contacts
      bottom: -100px
      padding: 30px 0
</style>
