import { Module } from 'vuex-smart-module';
import { TestingGetters } from '@/store/modules/testing/getters';
import { TestingMutations } from '@/store/modules/testing/mutations';
import { TestingActions } from '@/store/modules/testing/actions';
export class TestingState {
    constructor() {
        this.user = {
            name: '',
            lastName: '',
            email: '',
            telegram: '',
        };
        this.answers = {
            answers: [],
            userGUID: '',
        };
        this.currentAnswer = {
            pickedValue: '',
            question: 0,
        };
        this.doneTaskList = [];
        this.isModalWindowShowed = false;
        this.isIncorrectFormData = false;
        this.isAuthorized = false;
        this.timeRemain = 0;
        this.timeStart = 0;
        this.timer = 0;
        this.errorLogin = '';
        this.isShowFetchedError = false;
        this.questionTotalCount = 0;
        this.allQuestions = [];
    }
}
export const testingModule = new Module({
    namespaced: true,
    state: TestingState,
    getters: TestingGetters,
    mutations: TestingMutations,
    actions: TestingActions,
});
//# sourceMappingURL=index.js.map