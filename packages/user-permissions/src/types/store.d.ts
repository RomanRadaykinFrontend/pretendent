import { Group, User, UserFull, Domain, KV } from '../services/api'
import { Permission } from './userpermissions'
import { Region } from './../types/userpermissions'
import { RemoteDataStatus } from './common'
export interface RootState {
  language?: string
  id?: string
}

export interface CommonState {
  permissions: Array<Permission>
}

export interface AccountsState {
  domains: Array<Domain>,
  users: Array<User>,
  user: UserFull,
  pageSize: number,
  userKV: Array<KV>,
  loggedUser: {
    login: string,
    domain: string,
    isOkauthAdmin: boolean,
  },
  regions: Array<Region>
}

export interface GroupsState {
  groups: Array<Group>,
  groupUsers: Array<User>,
  pageSize: number
  groupKV: Array<KV>
  groupAction: {
    status: RemoteDataStatus
  }
}
