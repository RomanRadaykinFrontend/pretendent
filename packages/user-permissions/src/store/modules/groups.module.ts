import { GroupsState, RootState } from '../../types/store'
import { getAddDelLists, sortItems } from '../../services/helpers/userpermissions'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import {
  groupsApi, kvApi, KV,
  Group, User, Domain,
  GroupsGetUsersRequest, GroupsAddUserRequest,
  GroupsGetAllRequest, GroupsCreateRequest,
  GroupsUpdateRequest, GroupsDeleteRequest,
  GroupsDeleteUserRequest, KvGroupGetRequest,
} from '../../services/api'
import { AddDelList, GroupAllKVRequest, GroupUser, Permission, UpdateGroupPermitPayload } from '../../types/userpermissions'
import { RemoteDataStatus } from '../../types/common'

const namespaced = true

const moduleState: GroupsState = {
  groups: [],
  groupKV: [],
  groupUsers: [],
  pageSize: 25,
  groupAction: {
    status: RemoteDataStatus.INIT,
  },
}

const getters: GetterTree<GroupsState, RootState> = {
  groups: state => sortItems( state.groups, 'domain' ),
  groupUsers: state => state.groupUsers,
  kvValue: ({ groupKV }) => ( key: string ) => {
    const kv = groupKV.find( kv => kv.key === key )
    return kv ? JSON.parse( kv.value ) : ''
  },
  secureKeys: ({ groupKV }): Array<string> => {
    return groupKV.filter( kv => kv.key.slice(0,6) === 'secure' && kv.value === 'true' )
    .map( k => k.key )},
  status: ({ groupAction }): RemoteDataStatus => groupAction.status,
  groupPermits: ( s, getters, rs, rootGetters ): Array<string> => {
    const permits: Array<Permission> = rootGetters['upCommon/permissions']
    const groupPermits: Array<Permission> = permits.filter( p => (getters['secureKeys'] as Array<string>).includes( p.permit ) )
    return groupPermits.map( p => p.permit )
  },
}

const mutations: MutationTree<GroupsState> = {

  setGroupKV: ( state: GroupsState, kvList: Array<KV> ) => {
    state.groupKV = kvList
  },

  setGroups: ( state: GroupsState, groups: Array<Group> ) => {
    state.groups = sortItems( groups, 'displayName' )
  },

  setGroup: ( state: GroupsState, group: Group ) => {
    const groups = state.groups.filter( g => g.ident !== group.ident )
    state.groups.push( group )
    state.groups = sortItems( groups, 'displayName' )
  },

  setGroupUsers: ( state: GroupsState, users: Array<User> ) => {
    state.groupUsers = sortItems( users, 'displayName' )
  },

  addGroup: ( state: GroupsState, group: Group ) => {
    state.groups.unshift( group )
  },

  updateGroup: ( state: GroupsState, group: Group ) => {
    const items = state.groups.filter( g => g.ident !== group.ident )
    items.push( group )
    state.groups = sortItems( items, 'displayName' )
  },

  deleteGroup: ( state: GroupsState, ident: string ) => {
    state.groups = state.groups.filter( g => g.ident !== ident )
  },

  deleteUser: ( state: GroupsState, user: User ) => {
    state.groupUsers = state.groupUsers.filter( u => u.login !== user.login )
  },
}

const actions: ActionTree<GroupsState, RootState> = {

  fetchAllGroups: async ({ commit }, domains: Array<Domain> ) => {
    let groups: Array<Group> = []
    if ( domains.length === 0 ) {
      commit( 'setDomains', [])
      return
    }
    try {
      for ( const domain of domains ) {
        const request: GroupsGetAllRequest = {
          domain: domain.name,
          page: 0,
          limit: 50,
        }
        const response = await groupsApi.groupsGetAll( request )
        if ( typeof response.items !== 'undefined' ) {
          groups = groups.concat( response.items ?? [])
        }
      }
      commit( 'setGroups', groups )
    } catch ( e ) {
      commit( 'setGroups', [])
    }
  },

  fetchGroupUsers: async ({ commit }, { domain, ident }) => {
    const request: GroupsGetUsersRequest = {
      domain,
      ident,
      page: 0,
      limit: 1000,
      blocked: false,
    }
    const response = await groupsApi.groupsGetUsers( request )
    if ( typeof response.items !== 'undefined' ) {
      commit( 'setGroupUsers', response.items )
    } else {
      commit( 'setGroupUsers', [])
    }
  },

  createGroup: async ({ commit }, group: Group ) => {
    const request: GroupsCreateRequest = {
      inlineObject6: {
        ident: group.ident,
        displayName: group.displayName,
      },
    }
    const response = await groupsApi.groupsCreate( request )
    if ( typeof response === 'undefined' ) {
      commit( 'addGroup', group )
    }
  },

  groupsUpdate: async ({ commit }, group: Group ) => {
    const request: GroupsUpdateRequest = {
      ident: group.ident,
      inlineObject7: {
        displayName: group.displayName,
      },
    }
    const response = await groupsApi.groupsUpdate( request )
    if ( typeof response === 'undefined' ) {
      commit( 'updateGroup', group )
    }
  },

  groupsDelete: async ({ commit }, { domain, ident }) => {
    const request: GroupsDeleteRequest = {
      domain,
      ident,
    }
    const response = await groupsApi.groupsDelete( request )
    if ( typeof response === 'undefined' ) {
      commit( 'deleteGroup', ident )
    }
  },

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  groupsAddUser: async ({ state }, data: GroupUser ) => {
    const request: GroupsAddUserRequest = {
      ident: data.ident,
      inlineObject8: { ...data.user },
    }
    await groupsApi.groupsAddUser( request )
  },

  groupDeleteUser: async ({ commit }, { ident, user }) => {
    const request: GroupsDeleteUserRequest = {
      ident,
      inlineObject9: {
        domain: user.domain,
        login: user.login,
      },
    }
    const response = await groupsApi.groupsDeleteUser( request )
    if ( typeof response === 'undefined' ) {
      commit( 'deleteUser', user )
    }
  },

  fetchGroupKV: async ({ commit }, data: GroupAllKVRequest ) => {
    const payload: KvGroupGetRequest = {
      key: '*',
      ident: data.ident,
      domain: data.domain,
    }
    const response = await kvApi.kvGroupGet( payload )
    if ( response ) {
      commit( 'setGroupKV', response.items ?? [])
    }
  },

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  setGroupPermits: async ({ state, rootGetters }, data: UpdateGroupPermitPayload  ) => {
    // TODO: Добавить в стейт текущую группу
    const group: Group = data.group
    const oldPermits = data.permits.original
    const newPermits = data.permits.new
    const permissions = rootGetters['upCommon/permissions'] as Array<Permission>
    const lists: AddDelList = getAddDelLists( oldPermits, newPermits )
    const permitsToAdd = permissions.filter( p  => lists.toAdd.includes( p.permit ) )
    const permitsToDel = permissions.filter( p  => lists.toDel.includes( p.permit ) )
    // Добавление разрешений
    for ( const permit of permitsToAdd ) {
      if ( permit.extend?.length ) {
        // устанавливаем расширенные разрешения
        for ( const p of permit.extend ) {
          await kvApi.kvGroupSet({
            ident: group.ident,
            domain: group.domain,
            inlineObject11: { key: p, value: 'true' }
          })
        }
      }
      // устанавливаем выбранное разрешение
      await kvApi.kvGroupSet({
        ident: group.ident,
        domain: group.domain,
        inlineObject11: { key: permit.permit, value: 'true' }
      })
    }
    // Удаление разрешений
    for ( const permit of permitsToDel ) {
      if ( permit.extend?.length ) {
        // удаляем расширенные разрешения
        for ( const p of permit.extend ) {
          try {
            await kvApi.kvGroupDelete({
              key: p,
              ident: group.ident,
              domain: group.domain,
            })
          } catch ( e ) {
          }
        }
      }
      // удаляем выбранное разрешение
      try {
        await kvApi.kvGroupDelete({
          key: permit.permit,
          ident: group.ident,
          domain: group.domain,
        })
      } catch ( e ) {
      }
    }
  },
}

export default {
  namespaced,
  state: moduleState,
  getters,
  mutations,
  actions,
}
