import { MutationTree } from 'vuex'
import { CommonState } from '../../../types/store'
import { Permission } from '../../../types/userpermissions'

export const mutations: MutationTree<CommonState> = {
  setPermissions:( state: CommonState, permits: Array<Permission> ) => {
    const validPermits = permits.filter( p => !!p.permit )
    state.permissions = [...validPermits ]
  },
}
