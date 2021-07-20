import { Module } from 'vuex-smart-module';
import { AdminGetters } from '@/store/modules/admin/getters';
import { AdminMutations } from '@/store/modules/admin/mutations';
import { AdminActions } from '@/store/modules/admin/actions';
export class AdminState {
    constructor() {
        this.results = [];
        this.resultsCount = '10';
        this.totalCount = 0;
        this.userID = '';
        this.typeTasks = 'Все вопросы';
        this.questions = [];
        this.page = 1;
        this.sortQuestions = [];
        this.isAllDataFetched = false;
        this.rightAnswers = [];
    }
}
export const adminModule = new Module({
    namespaced: true,
    state: AdminState,
    getters: AdminGetters,
    mutations: AdminMutations,
    actions: AdminActions,
});
//# sourceMappingURL=index.js.map