import Vue from 'vue';
import Vuex from 'vuex';
import authStore from './modules/auth.module/index';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        authStore,
    },
});
//# sourceMappingURL=index.js.map