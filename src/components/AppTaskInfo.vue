<template lang="pug">
  div.info-wrapper
    div.remain-time
      span Осталось времени: 0:19
    div.remain-question
      span Вопрос 1/15
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component

export default class AppTaskInfo extends Vue {

}
</script>

<style scoped lang="sass">
@import '../common/assets/common'
.info-wrapper
  position: absolute
  right: -45%
  top: 10%

.remain-time, .remain-question
  padding: 10px 0
  color: rgb(128, 128, 128)
  font: $main-text-style

</style>
