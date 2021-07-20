import { Mutations } from 'vuex-smart-module';
export class TestingMutations extends Mutations {
    setUser(arrData) {
        const [name, value] = arrData;
        this.state.user[name] = value;
    }
    setUserGUID(userGUID = '') {
        this.state.answers.userGUID = userGUID;
    }
    setAnswers(data) {
        const { question, answer } = data;
        const needElemIndex = this.state.answers.answers.findIndex(item => {
            if (item.question === question) {
                return true;
            }
        });
        if (needElemIndex !== -1) {
            this.state.answers.answers[needElemIndex].answer = answer;
        }
        else {
            this.state.answers.answers = [...this.state.answers.answers, { question, answer }];
        }
        localStorage.setItem('answers', JSON.stringify(this.state.answers.answers));
    }
    setAnswersFromStorage(data) {
        this.state.answers.answers = [...data];
    }
    setCurrentAnswer(value) {
        this.state.currentAnswer = value;
    }
    setDoneTaskList(object) {
        const { taskNumber, value } = object;
        const needElemIndex = this.state.doneTaskList.findIndex(item => {
            if (item.taskNumber === taskNumber) {
                return true;
            }
        });
        if (needElemIndex !== -1) {
            this.state.doneTaskList[needElemIndex].value = value;
            this.state.doneTaskList = [...this.state.doneTaskList];
        }
        else {
            this.state.doneTaskList = [...this.state.doneTaskList, { taskNumber, value }];
        }
        localStorage.setItem('doneTaskList', JSON.stringify(this.state.doneTaskList));
    }
    setDoneTaskListLocalStorage(data) {
        this.state.doneTaskList = [...data];
    }
    setIsModalWindowShowed(value) {
        this.state.isModalWindowShowed = value;
    }
    setIsIncorrectFormData(value) {
        this.state.isIncorrectFormData = value;
    }
    setIsAuthorized(value) {
        this.state.isAuthorized = value;
        localStorage.isAuthorized = value;
    }
    setTimeRemain() {
        this.state.timer = setInterval(() => {
            this.state.timeRemain -= 1;
        }, 1000);
    }
    setTimeRemainLocalStorage(value) {
        this.state.timeRemain = value;
    }
    setTimeStart(value) {
        this.state.timeStart = value;
    }
    setTimer(value) {
        clearInterval(value);
    }
    setIsErrorLogin(value) {
        this.state.errorLogin = value;
    }
    setIsShowFetchedError(value) {
        this.state.isShowFetchedError = value;
    }
    setAllQuestions(value) {
        this.state.allQuestions = value;
    }
    setQuestionTotalCount(value) {
        this.state.questionTotalCount = value;
    }
}
//# sourceMappingURL=mutations.js.map