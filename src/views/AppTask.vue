<template lang="pug">
  div.task-wrapper
    div.task-title Какой результат напечатает нижеследующий код при исполнении согласно стандарту C++?
    app-radio(
      name="question1"
      :array-of-values="['answer1', 'answer2', 'answer3', 'Другое']"
      @form-radio-change="getFormData"
    )
    app-task-info
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import AppRadio from '../components/AppRadio.vue'
import AppTaskInfo from '../components/AppTaskInfo.vue'

@Component({
  components: {
    AppTaskInfo,
    AppRadio,
  },
})
export default class AppTask extends Vue {}

</script>

<style scoped lang="sass">
@import '../common/assets/common'
.task-wrapper
  width: 30%
  height: auto
  margin: 3% auto
  box-sizing: border-box
  padding: 20px
  border: 1px solid rgb(140, 145, 150)
  border-radius: 10px
  position: relative

  .task-title
    font: $main-text-style

  .buttons-wrapper
    display: flex
</style>
