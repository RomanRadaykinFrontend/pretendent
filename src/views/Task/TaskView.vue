<template lang="pug">
  .task-wrapper
    TaskBody
    TaskInfo
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import TaskInfo from '@/views/Task/parts/TaskInfo.vue'
import TaskBody from '@/views/Task/parts/TaskBody.vue'

@Component({
  components: {
    TaskInfo,
    TaskBody,
  },
})
export default class TaskView extends Vue {}

</script>

<style scoped lang="sass">
@import '../../common/assets/common'
.task-wrapper
  width: 100%
  height: 100%
  background: url("./../../common/images/task-background.png")
  box-sizing: border-box
  padding: 20px
  position: relative
  display: flex
  justify-content: center
  flex-direction: column
  align-items: center
  font-family: Roboto, serif

@media screen and (max-width: 768px)
  .task-wrapper
    width: 730px
    height: auto
    padding: 0 10px
@media screen and (max-width: 320px)
  .task-wrapper
    width: 320px
</style>
