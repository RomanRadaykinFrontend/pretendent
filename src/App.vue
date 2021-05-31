<template lang="pug">
  #app
    router-view(:key="$route.path")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginFormVIew from './views/LoginFormVIew.vue'
import BlankBackgroundView from './views/BlankBackgroundView.vue'
import TaskView from './views/TaskView.vue'
import FinalPageView from './views/FinalPageView.vue'


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
