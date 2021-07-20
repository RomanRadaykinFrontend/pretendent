import { TokenStatus } from './../../types/common.types';
import { authApi } from '../../services/api';
import { getAccessToken, getRefreshToken, saveTokensData, setToStorage } from '../../services/helpers';
import store from './../../store/';
import { FETCH_USER } from './../../store/modules/action.types';
export const checkAPI = (api) => {
    if (!api) {
        const token = getAccessToken();
        if (token) {
            window.EVENT_BUS.$emit(TokenStatus.SUCCESS, token);
        }
    }
};
export const sortItems = (items, key) => {
    if (!items || !key) {
        return items;
    }
    return items.sort((a, b) => (a[key] ?? '') > (b[key] ?? '') ? 1 : -1);
};
export const checkADFSAuth = () => {
    const urlParams = getURLParams(window.location.href);
    const params = {
        state: urlParams.state,
        token: urlParams.token,
    };
    if (params.state && params.token) {
        setToStorage('token', params.token);
    }
};
export const encodeJSON = (data) => (data instanceof Object)
    ? btoa(encodeURIComponent(JSON.stringify(data)))
    : '';
export const decodeJSON = (data) => data?.trim()
    ? JSON.parse(decodeURIComponent(atob(data)))
    : '';
export const getURLParams = (URL) => {
    const result = URL.substring(URL.indexOf('?') + 1)
        .split('&')
        .reduce((memo, param) => ({
        ...memo,
        [param.split('=')[0]]: param.split('=')[1],
    }), {});
    return result;
};
export const updateTokens = async () => {
    try {
        const payload = {
            inlineObject: {
                refreshToken: getRefreshToken(),
            },
        };
        const response = await authApi.authRefresh(payload);
        if (response.accessToken && response.refreshToken) {
            saveTokensData(response);
            window.EVENT_BUS.$emit(TokenStatus.SUCCESS, response.accessToken);
        }
        else {
            window.EVENT_BUS.$emit(TokenStatus.ERROR, 'Tokens not received when updating tokens');
            return;
        }
    }
    catch (e) {
        window.EVENT_BUS.$emit(TokenStatus.ERROR, 'Tokens update error');
    }
};
export const saveUserDataToStorage = (user) => {
    const userData = encodeJSON({
        login: user?.login ?? '',
        domain: user?.domain ?? '',
        displayName: user?.displayName ?? '',
    });
    setToStorage('user', userData);
};
export const getAuthPayload = (data) => {
    let authData = null;
    if (data?.isADFS) {
        authData = { token: data.token, state: data.state };
    }
    else {
        authData = { login: data.login, password: data.password };
    }
    return {
        domain: data.domain,
        domainType: authData,
    };
};
export var AuthError;
(function (AuthError) {
    AuthError["ACCESS_DENIED"] = "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430";
    AuthError["AUTH_FAILED"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F";
    AuthError["USER_DATA_FAILED"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F";
    AuthError["DOMAIN_DATA_FAILED"] = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0434\u043E\u043C\u0435\u043D\u043E\u0432";
})(AuthError || (AuthError = {}));
export const hasUserData = async () => {
    try {
        if (!store.getters['authStore/user']) {
            await store.dispatch('authStore/' + FETCH_USER);
        }
        return store.getters['authStore/user'];
    }
    catch (e) {
        return false;
    }
};
//# sourceMappingURL=login.js.map