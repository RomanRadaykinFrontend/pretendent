import { SET_DEFAULT_DATA, SET_DOMAINS, SET_AFTER_LOGIN, SET_USER, SET_STATUS, SET_MESSAGE, SET_ALLOWED_PERMITS, } from './../mutation.types';
import { getDefaultState } from './index';
import { decodeJSON, encodeJSON, getFromStorage, setToStorage, StoreKeys } from '../../../services/helpers';
export const mutations = {
    [SET_USER]: (state, user) => {
        state.user = user;
    },
    [SET_AFTER_LOGIN]: (state, value) => {
        state.afterLogin = value;
    },
    [SET_DOMAINS]: (state, domains) => {
        state.domains = domains;
    },
    [SET_DEFAULT_DATA]: (state) => {
        Object.assign(state, getDefaultState());
    },
    [SET_ALLOWED_PERMITS]: (state, permits) => {
        if (permits) {
            state.allowedPermits = [...permits];
            setToStorage(StoreKeys.PERMITS, encodeJSON(permits));
            return;
        }
        const storedPermits = decodeJSON(getFromStorage(StoreKeys.PERMITS));
        state.allowedPermits = storedPermits ?? [];
    },
    [SET_STATUS]: (state, status) => {
        state.status = status;
    },
    [SET_MESSAGE]: (state, msg) => {
        state.message = msg;
    },
};
//# sourceMappingURL=mutations.js.map