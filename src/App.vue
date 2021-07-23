<template lang="pug">
  #app(
    :key = "uniqueId"
    :class = "appModalStyle"
    ref = "app"
  )
    router-view(:key="$route.path")
    ModalWindow(
      v-if="isShowed"
      @close-modal="hideModalWindow"
      @end-test="goToFinalPage"
      :height = "this.$refs.app.clientHeight"
    )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginFormVIew from './views/Registration/parts/LoginFormVIew.vue'
import BlankBackgroundView from './views/Registration/parts/BlankBackgroundView.vue'
import TaskView from './views/Task/TaskView.vue'
import FinalPageView from './views/FinalPage/FinalPageView.vue'
import ModalWindow from '@/components/AppModalWindow.vue'
import { v4 as uuidv4 } from 'uuid'
import { testingModule } from '@/store'

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

  get uniqueId(){
    return uuidv4()
  }

  get isShowed(){
    return testingModule.getters.isModalWindowShowed
  }

  get appModalStyle(){
    return {
      ['is-modal-on']: this.$route.name === 'TaskView',
    }
  }

  $refs!: {
    app: HTMLDivElement
  }


  // при создании app задаем вводные - проверяем авторизацию, пушим данные из локала в стор
  private created(){
    testingModule.actions.getAllQuestions()
    if( localStorage.getItem( 'doneTaskList' ) ) {
      const value = JSON.parse( localStorage?.getItem( 'doneTaskList' ) || '' )
      testingModule.mutations.setDoneTaskListLocalStorage( value )
    }
    if( localStorage.getItem( 'isAuthorized' ) === 'true' ){
      const answerFromStorage = localStorage?.getItem( 'answers' )
      const answers = answerFromStorage ? JSON.parse( answerFromStorage ) : []
      testingModule.mutations.setAnswersFromStorage( answers )
      testingModule.mutations.setUserGUID( localStorage.getItem( 'userGUID' ) || '' )

      const timeStart = localStorage?.getItem( 'timeStart' )
      const timeDifference = Math.floor( Date.now()/1000 ) - ( timeStart ? +timeStart : 0 )
      const timeRemain = 5400 - timeDifference

      if( timeRemain <= 0 ){
        this.$router.push( '/final' )
      } else {
        testingModule.mutations.setTimeRemainLocalStorage( timeRemain )
      }
      testingModule.mutations.setTimeRemain()
    }
  }
  private hideModalWindow(){
    testingModule.mutations.setIsModalWindowShowed( false )
    if( this.$route.params.id !== localStorage.getItem( 'task' ) ){
      this.$router.push( `/questions/${localStorage.task}` )
    }
  }
  private goToFinalPage(){
    testingModule.mutations.setIsModalWindowShowed( false )
    this.$router.push( '/final' )
  }
}
</script>

<style lang="sass" scoped>
#app
  height: 100%
  width: 100%
  white-space: pre-line
  color: #2A3640
  &.is-modal-on
    height: auto
</style>
