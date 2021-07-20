import { getFromStorage, decodeJSON } from '.';
import { StoreKeys } from './storage';
export const getLoggedUserData = () => {
    const user = getUserFromStore();
    return !user ? null : {
        domain: user.domain,
        login: user.login,
    };
};
export const getUserFromStore = () => {
    const userData = getFromStorage(StoreKeys.USER);
    return userData ? decodeJSON(userData) : null;
};
export const checkAccessGranted = (allowedPermits, permits) => {
    if (allowedPermits.length && permits.length) {
        return allowedPermits?.some(p => permits.includes(p)) ?? false;
    }
    else {
        return false;
    }
};
//# sourceMappingURL=store.js.map