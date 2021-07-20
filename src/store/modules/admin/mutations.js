import { Mutations } from 'vuex-smart-module';
export class AdminMutations extends Mutations {
    setResults(value) {
        this.state.results = value;
    }
    setResultsCount(value) {
        this.state.resultsCount = value;
    }
    setTotalCount(value) {
        this.state.totalCount = value;
    }
    setUserID(value) {
        this.state.userID = value;
    }
    setTypeTasks(value) {
        this.state.typeTasks = value;
    }
    setQuestions(value) {
        this.state.questions = value;
    }
    setPage(value) {
        this.state.page = value;
    }
    setSortQuestions(value) {
        this.state.sortQuestions = value;
    }
    setIsAllDataFetched(value) {
        this.state.isAllDataFetched = value;
    }
    setRightAnswers(value) {
        this.state.rightAnswers = value;
    }
}
//# sourceMappingURL=mutations.js.map