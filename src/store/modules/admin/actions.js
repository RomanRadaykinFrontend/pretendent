import { Actions } from 'vuex-smart-module';
import { QUESTIONS_API, RESULTS_API } from '@/services/api';
export class AdminActions extends Actions {
    async getAllQuestions() {
        try {
            const result = await QUESTIONS_API.questions();
            this.commit('setQuestions', result.questions);
        }
        catch (e) {
            return e.message;
        }
    }
    async getResults() {
        try {
            this.commit('setIsAllDataFetched', true);
            const totalCount = (await RESULTS_API.results({ offset: 0, limit: 1 })).count;
            this.commit('setTotalCount', totalCount);
            const result = await RESULTS_API.results({ offset: 0, limit: totalCount });
            const users = result.users.map((u, idx) => ({ ...u, id: idx + 1 }));
            this.commit('setResults', users);
            this.commit('setTotalCount', result.count);
        }
        catch (e) {
            return e.message;
        }
        this.commit('setIsAllDataFetched', false);
    }
    async getRightAnswer() {
        try {
            const result = await QUESTIONS_API.correct();
            this.commit('setRightAnswers', result.correctAnswers);
        }
        catch (e) {
            return e.message;
        }
    }
}
//# sourceMappingURL=actions.js.map