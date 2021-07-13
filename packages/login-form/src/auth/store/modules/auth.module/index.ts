import { AuthState, RootState } from './../../../types/store.types'
import { mutations } from './mutations'
import { actions } from './actions'
import { GetterTree } from 'vuex'
import { RemoteDataStatus } from './../../../types/common.types'
import { UserFull } from '../../../services/api'
import { KV_SECURE_OKAUTH_ADMIN } from '../../../services/helpers/kvkeys'
import { checkAccessGranted } from '../../../services/helpers'

export const getDefaultState = (): AuthState => ({
  user: null,
  domains: null,
  afterLogin: false,
  status: RemoteDataStatus.INIT,
  message: '',
  allowedPermits: [],
})

const moduleState: AuthState = getDefaultState()

const getters: GetterTree<AuthState, RootState> = {
  isRootUser: ({ user }) => user?.kv?.find( kv => kv.key === KV_SECURE_OKAUTH_ADMIN )?.value === 'true',
  message: ({ message }): string => message,
  status: ({ status }): RemoteDataStatus => status,
  user: ({ user }): UserFull => user,
  afterLogin: state => state.afterLogin,
  domains: state => state.domains,
  groupsPermits: ({ user }) => {
    const groupKVList = user.kv?.filter( kv => kv.groupIdent ) ?? []
    return groupKVList.map( kv => kv.key )
  },
  userPermits: ({ user }): Array<string> => {
    const userKVList = user.kv?.filter( kv => !kv.groupIdent && !kv.groupDomain ) ?? []
    return userKVList.map( kv => kv.key )
  },
  isAccessGranted: ({ allowedPermits }, getters ): boolean => {
    if ( getters.isRootUser ) {
      return true
    }
    const grantedByGroupPermits = checkAccessGranted( allowedPermits, getters.groupsPermits )
    const grantedByUserPermits = checkAccessGranted( allowedPermits, getters.userPermits )
    return grantedByGroupPermits || grantedByUserPermits
  },
}

export default {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
}
