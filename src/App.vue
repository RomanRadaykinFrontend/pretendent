<template lang="pug">
  #app
    div.login(v-if="page===1")
      app-login-form
    div.blank(v-if="page===1")
      blank-background
    app-task(v-if="page===2")
    app-final-page(v-if="page===3")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppLoginForm from './views/AppLoginForm.vue'
import BlankBackground from './views/BlankBackground.vue'
import AppTask from './views/AppTask.vue'
import AppFinalPage from './views/AppFinalPage.vue'
import { namespace } from 'vuex-class'

const CommonModule = namespace( 'commonModule' )

@Component({
  components: {
    AppFinalPage,
    AppLoginForm,
    BlankBackground,
    AppTask,
  },
})
export default class App extends Vue {

  @CommonModule.Getter( 'page' ) public page!: number

}

</script>

<style lang="sass" scoped>
#app
  width: 100%
  height: 1000px
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  position: relative
  .login
    width: 45%
    height: 100%
    display: flex
    justify-content: flex-end
    align-items: flex-start

  .blank
    width: 55%
    height: 100%
</style>
