import { TOKEN_REFRESH_INTERVAL } from '../helpers';
const STORAGE = window.localStorage;
export var StoreKeys;
(function (StoreKeys) {
    StoreKeys["USER"] = "user";
    StoreKeys["UPDATE"] = "update";
    StoreKeys["PERMITS"] = "permits";
    StoreKeys["A_TOKEN"] = "access_token";
    StoreKeys["R_TOKEN"] = "refresh_token";
    StoreKeys["ADFS_TOKEN"] = "token";
    StoreKeys["ADFS_STATE"] = "ADFS_state";
    StoreKeys["ADFS_DOMAIN"] = "ADFS_domain";
})(StoreKeys || (StoreKeys = {}));
export const keyListToClear = [
    StoreKeys.USER,
    StoreKeys.UPDATE,
    StoreKeys.R_TOKEN,
    StoreKeys.A_TOKEN,
    StoreKeys.ADFS_STATE,
    StoreKeys.ADFS_DOMAIN,
];
export const setToStorage = (key, value = '') => {
    STORAGE.setItem(key, value);
};
export const getFromStorage = (key) => STORAGE.getItem(key);
export const removeFromStorage = (key) => {
    STORAGE.removeItem(key);
};
export const clearStorage = (keys = [
    StoreKeys.A_TOKEN, StoreKeys.R_TOKEN, StoreKeys.UPDATE, StoreKeys.USER,
]) => {
    keys.forEach(key => {
        removeFromStorage(key);
    });
};
export const isStorageKeysExist = (keys = [
    StoreKeys.A_TOKEN, StoreKeys.R_TOKEN, StoreKeys.UPDATE,
]) => {
    for (const key of keys) {
        if (getFromStorage(key) === null) {
            return false;
        }
    }
    return true;
};
export const saveTokensData = (data) => {
    setToStorage(StoreKeys.A_TOKEN, data.accessToken);
    setToStorage(StoreKeys.R_TOKEN, data.refreshToken);
    setToStorage(StoreKeys.UPDATE, String((Date.now() + TOKEN_REFRESH_INTERVAL)));
};
//# sourceMappingURL=storage.js.map