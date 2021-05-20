<template lang="pug">
  div.login-form-wrapper
    div.title-wrapper
      span Привет, начнем?
    div.description-wrapper
      span.description Мы подготовили для вас тесты на языке C++. Они помогут&nbsp
        | нам оценить ваши знания, а вам проверить свои :)
        | На каждый вопрос у вас будет 2 минуты, удачи!
    div.login-form
      form
        login-form-input(
          placeholder="Имя*"
          name="name"
          @get-text="getFormData"
        )
        login-form-input(
          placeholder="Фамилия*"
          name="surname"
          @get-text="getFormData"
        )
        login-form-input(
          placeholder="Email*"
          name="email"
          @get-text="getFormData"
        )
        login-form-input(
          placeholder="Telegram"
          name="telegram"
          @get-text="getFormData"
        )
        app-button(
          @button-action="showMeData"
        ) Начать тестирование
    div.contacts
      span Связаться с нами&nbsp
        span.contacts-email alszhechkova@stc-spb.ru
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import AppButton from '../components/AppButton.vue'
import LoginFormInput from '../components/LoginFormInput.vue'
import { FormData } from '../types/common'
import { FormDataItem } from '../types/common'

@Component({
  components: {
    AppButton, LoginFormInput,
  },
})

export default class AppLoginForm extends Vue {
  public formData = {} as FormData

  public getFormData( formArr: FormDataItem ){
    const [ name, value ] = formArr
    this.formData[name] = value
  }

  public showMeData(){
    console.log( this.formData )
  }

}

</script>

<style scoped lang="sass">
@import '../common/assets/common'
.login-form-wrapper
  width: 450px
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
</style>
