import { sortItems } from './../../../services/helpers/userpermissions'
import { GetterTree } from 'vuex'
import { RootState, CommonState } from '../../../types/store'
import { mutations } from './mutations'

const moduleState: CommonState = {
  permissions: [],
}

const getters: GetterTree<CommonState, RootState> = {
  permissions: ({ permissions }) => sortItems( [...permissions], 'alias' )
}

export default {
  state: moduleState,
  namespaced: true,
  getters,
  mutations,
}

