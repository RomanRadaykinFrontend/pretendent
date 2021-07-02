<template lang="pug">
.ans-viewer-view
  .ans-viewer-view__control-panel
    button.ans-viewer-view__back-button Назад
    select.ans-viewer-view__select
      option Все вопросы
      option Отвеченные вопросы
      option Неотвеченные вопросы


  .ans-viewer-view__answer-table


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TableRow from '@/views/AdminPanelView/parts/TableRow.vue'
import ControlPanel from '@/views/AdminPanelView/parts/ControlPanel.vue'

@Component({
  components: {
    ControlPanel,
    TableRow,
  },
})
export default class AnsViewerView extends Vue{


}
</script>

<style scoped lang="sass">
.ans-viewer-view


</style>
