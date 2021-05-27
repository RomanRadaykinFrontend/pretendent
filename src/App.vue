<template lang="pug">
  #app
    router-view(:key="$route.path")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppLoginForm from './views/AppLoginForm.vue'
import BlankBackground from './views/BlankBackground.vue'
import AppTask from './views/AppTask.vue'
import AppFinalPage from './views/AppFinalPage.vue'


@Component({
  components: {
    AppFinalPage,
    AppLoginForm,
    BlankBackground,
    AppTask,
  },
})
export default class App extends Vue {
}
</script>

<style lang="sass" scoped>
#app
  height: 1000px
  white-space: pre-line
</style>
