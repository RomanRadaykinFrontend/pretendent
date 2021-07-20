import { mutations } from './mutations';
import { actions } from './actions';
import { RemoteDataStatus } from './../../../types/common.types';
import { KV_SECURE_OKAUTH_ADMIN } from '../../../services/helpers/kvkeys';
import { checkAccessGranted } from '../../../services/helpers';
export const getDefaultState = () => ({
    user: null,
    domains: null,
    afterLogin: false,
    status: RemoteDataStatus.INIT,
    message: '',
    allowedPermits: [],
});
const moduleState = getDefaultState();
const getters = {
    isRootUser: ({ user }) => user?.kv?.find(kv => kv.key === KV_SECURE_OKAUTH_ADMIN)?.value === 'true',
    message: ({ message }) => message,
    status: ({ status }) => status,
    user: ({ user }) => user,
    afterLogin: state => state.afterLogin,
    domains: state => state.domains,
    groupsPermits: ({ user }) => {
        const groupKVList = user.kv?.filter(kv => kv.groupIdent) ?? [];
        return groupKVList.map(kv => kv.key);
    },
    userPermits: ({ user }) => {
        const userKVList = user.kv?.filter(kv => !kv.groupIdent && !kv.groupDomain) ?? [];
        return userKVList.map(kv => kv.key);
    },
    commonPermits: (s, getters) => Array.from(new Set([...getters.groupsPermits, ...getters.userPermits])),
    isAccessGranted: ({ allowedPermits }, getters) => getters.isRootUser
        ? true
        : checkAccessGranted(allowedPermits, getters.commonPermits),
};
export default {
    namespaced: true,
    state: moduleState,
    getters,
    mutations,
    actions,
};
//# sourceMappingURL=index.js.map