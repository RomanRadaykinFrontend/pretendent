import { getFromStorage, StoreKeys } from '../helpers/storage';
export const getAccessToken = () => getFromStorage(StoreKeys.A_TOKEN) ?? null;
export const getRefreshToken = () => getFromStorage(StoreKeys.R_TOKEN) ?? null;
export const addAccessTokenToParams = (request, accessToken) => {
    if (!accessToken) {
        return;
    }
    if (!request?.query) {
        request.query = {};
    }
    request.query['access_token'] = accessToken;
};
//# sourceMappingURL=api.js.map