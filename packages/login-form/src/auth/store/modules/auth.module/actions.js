import { RESET_USER_DATA, FETCH_DOMAINS, FETCH_USER, PASS_AUTH, } from './../action.types';
import { SET_DEFAULT_DATA, SET_DOMAINS, SET_USER, SET_STATUS, SET_MESSAGE, SET_AFTER_LOGIN, } from './../mutation.types';
import { sortItems, getLoggedUserData, AuthError } from './../../../services/helpers';
import { RemoteDataStatus, TokenStatus } from './../../../types/common.types';
import { getAuthPayload, saveTokensData, saveUserDataToStorage, } from './../../../services/helpers';
import { authApi, domainsApi, usersApi, } from './../../../services/api';
export const actions = {
    [FETCH_DOMAINS]: async ({ commit }) => {
        try {
            const response = await domainsApi.domainsGet();
            if (response.items) {
                commit(SET_DOMAINS, sortItems(response.items, 'name'));
            }
        }
        catch (e) {
            commit(SET_DOMAINS, null);
        }
    },
    [RESET_USER_DATA]: ({ commit }) => {
        commit(SET_DEFAULT_DATA);
    },
    [FETCH_USER]: async ({ commit }, data) => {
        const response = await usersApi.usersGet(data ?? getLoggedUserData());
        commit(SET_USER, response?.items[0] ?? null);
    },
    [PASS_AUTH]: async ({ commit, dispatch, rootGetters }, loginData) => {
        window.EVENT_BUS.$emit(TokenStatus.RESET);
        commit(SET_STATUS, RemoteDataStatus.PENDING);
        commit(SET_MESSAGE, '');
        let user = {};
        let accessToken = '';
        let refreshToken = '';
        // пробуем авторизоваться с указанными данными
        try {
            const authPayload = getAuthPayload(loginData);
            const response = await authApi.authUser(authPayload);
            accessToken = response?.accessToken;
            refreshToken = response?.refreshToken;
        }
        catch (e) {
            commit(SET_STATUS, RemoteDataStatus.ERROR);
            commit(SET_MESSAGE, AuthError.AUTH_FAILED);
            return;
        }
        // TODO :ADFS
        if (accessToken && refreshToken) {
            // сообщаем что токен получен и можем переинициализировать API
            // с новым токеном
            window.EVENT_BUS.$emit(TokenStatus.SUCCESS, accessToken);
            // запросим данные пользователя
            await dispatch(FETCH_USER, {
                domain: loginData.domain,
                login: loginData.login,
            });
            user = rootGetters['authStore/user'];
            if (!user) {
                commit(SET_STATUS, RemoteDataStatus.ERROR);
                commit(SET_MESSAGE, AuthError.USER_DATA_FAILED);
                return;
            }
        }
        else {
            commit(SET_STATUS, RemoteDataStatus.ERROR);
            commit(SET_MESSAGE, AuthError.AUTH_FAILED);
            return;
        }
        // токены получены, данные пользователя получены,
        // проверяем доступ
        if (rootGetters['authStore/isAccessGranted']) {
            // TODO: Удалить когда не будет ошибок инициализации апишек
            // if ( !loginData.isADFS ) {
            //   checkAPI( usersApi )
            //   await dispatch( FETCH_USER, {
            //     domain: loginData.domain!,
            //     login: loginData.login!,
            //   })
            // }
            saveTokensData({ accessToken, refreshToken });
            saveUserDataToStorage(user);
            commit(SET_AFTER_LOGIN, true);
            commit(SET_STATUS, RemoteDataStatus.SUCCESS);
        }
        else {
            commit(SET_STATUS, RemoteDataStatus.ERROR);
            commit(SET_MESSAGE, AuthError.ACCESS_DENIED);
        }
    },
};
//# sourceMappingURL=actions.js.map