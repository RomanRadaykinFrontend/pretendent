import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import '@/common/assets/common.sass'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueExcelXlsx from 'vue-excel-xlsx'

Vue.config.productionTip = false
Vue.use( VueExcelXlsx )

new Vue({
  router,
  store,
  render: h => h( App ),
}).$mount( '#app' )



