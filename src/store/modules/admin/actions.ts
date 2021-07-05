import { AdminState } from './index.js'
import { Actions } from 'vuex-smart-module'
import { AdminGetters } from '@/store/modules/admin/getters'
import { AdminMutations } from '@/store/modules/admin/mutations'



export class AdminActions extends Actions<
AdminState,
AdminGetters,
AdminMutations,
AdminActions> {

}
