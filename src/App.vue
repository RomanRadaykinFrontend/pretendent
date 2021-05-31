<template lang="pug">
  #app
    router-view(:key="$route.path")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginFormVIew from './views/Registration/parts/LoginFormVIew.vue'
import BlankBackgroundView from './views/Registration/parts/BlankBackgroundView.vue'
import TaskView from './views/Task/TaskView.vue'
import FinalPageView from './views/FinalPage/FinalPageView.vue'


@Component({
  components: {
    FinalPageView,
    LoginFormVIew,
    BlankBackgroundView,
    TaskView,
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
