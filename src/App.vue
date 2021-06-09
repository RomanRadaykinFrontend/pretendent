<template lang="pug">
  #app
    router-view(:key="$route.path")
    modal-window(
      v-if="isShowed"
      @close-modal="hideModalWindow"
      @end-test="goToFinalPage"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginFormVIew from './views/Registration/parts/LoginFormVIew.vue'
import BlankBackgroundView from './views/Registration/parts/BlankBackgroundView.vue'
import TaskView from './views/Task/TaskView.vue'
import FinalPageView from './views/FinalPage/FinalPageView.vue'
import ModalWindow from '@/components/AppModalWindow.vue'
import { commonModule } from '@/store'


@Component({
  components: {
    ModalWindow,
    FinalPageView,
    LoginFormVIew,
    BlankBackgroundView,
    TaskView,
  },
})
export default class App extends Vue {
  // вызов модального окна
  get isShowed(){
    return commonModule.getters.isModalWindowShowed
  }
  private hideModalWindow(){
    commonModule.mutations.setIsModalWindowShowed( false )
  }
  private goToFinalPage(){
    commonModule.mutations.setIsModalWindowShowed( false )
    this.$router.push( '/final' )
  }
}
</script>

<style lang="sass" scoped>
#app
  height: 100%
  width: 100%
  white-space: pre-line
</style>
