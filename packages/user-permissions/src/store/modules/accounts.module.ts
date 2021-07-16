import { AccountsState, RootState } from '../../types/store'
import { AddDelList, Permission, Region, UserCredentials, UserKV } from '../../types/userpermissions'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { domainsApi, usersApi, kvApi, UserFull } from '../../services/api'
import {
  User, Domain, UsersGetAllRequest, UsersCreateRequest, UsersDeleteRequest,
  UsersGetRequest, UsersBlockRequest, UsersUnblockRequest, UsersUpdateRequest,
  KvUserGetRequest, KvUserSetRequest, KvUserDeleteRequest,
} from '../../services/api'

import { getAddDelLists, sortItems } from '../../services/helpers/userpermissions'

const namespaced = true

const moduleState: AccountsState = {
  domains: [],
  users: [],
  user: {},
  pageSize: 25,
  userKV: [],
  regions: [],
  loggedUser: {
    login: '',
    domain: '',
    isOkauthAdmin: false,
  },
}

const getters: GetterTree<AccountsState, RootState> = {
  loggedUser: state => state.loggedUser,
  users: state => state.users,
  domains: state => state.domains,
  user: state => state.user,
  userKV: ({ user }) => ( key: string ) => {
    return JSON.parse( user?.kv?.find( kv => kv.key === key )?.value ?? 'null' )
  },
  isRegionsEditEnabled: state => !!state.regions,
  regions: state => state.regions ?? [],
  userPermits: ({ user }): Array<string> => user?.kv?.filter( kv => !kv.groupIdent && kv.value === 'true' )?.map( kv => kv.key ) ?? []
}

const mutations: MutationTree<AccountsState> = {
  setLoggedUser: ( state: AccountsState, userData: any ) => {
    state.loggedUser = userData
  },

  setDomains: ( state: AccountsState, domains: Array<Domain> ) => {
    state.domains = sortItems( domains, 'name' )
  },

  setUsers: ( state: AccountsState, users: Array<User> ) => {
    state.users = sortItems( users, 'domain' )
  },

  setUser: ( state: AccountsState, user: User ) => {
    state.user = user ?? {}
  },

  addUser: ( state: AccountsState, user: User ) => {
    state.users.unshift({
      blocked: false,
      login: user.login,
      domain: user.domain,
      displayName: user.displayName,
    })
  },

  updateUser: ( state: AccountsState, user: User ) => {
    state.users[state.users.findIndex( c => c.login === user.login )] = user
  },

  setBlockUser: ( state: AccountsState, { user, blocked }) => {
    state.users.filter( c => c.login === user.login )[0].blocked = blocked
  },

  deleteUser: ( state: AccountsState, user: User ) => {
    state.users = state.users.filter( u => u.login !== user.login )
  },
  // TODO: Выпилить получение/установку КВ пользователя, т.к. они приходят при запросе юзера
  setUserKV: ( state: AccountsState, { key, value }) => {
    const kv = state.userKV.filter( c => c.key === key )
    if ( kv.length !== 0 ) {
      state.userKV.filter( c => c.key === key )[0].value = value
    }
    state.userKV.push({ key, value })
  },

  setRegions: ( state: AccountsState, regions: Array<Region> ) => {
    state.regions = regions
  },
}

const actions: ActionTree<AccountsState, RootState> = {

  fetchUsers: async ({ state, commit }) => {
    let users: Array<User> = []
    if ( state.domains.length === 0 ) {
      commit( 'setUsers', [])
      return
    }
    try {
      for ( const domain of state.domains ) {
        const request: UsersGetAllRequest = {
          domain: domain.name,
          blocked: false,
        }
        const response = await usersApi.usersGetAll( request )
        users = users.concat( response?.items ?? [])
      }
      for ( const domain of state.domains ) {
        const request: UsersGetAllRequest = {
          domain: domain.name,
          blocked: true,
        }
        const response = await usersApi.usersGetAll( request )
        users = users.concat( response?.items ?? [])
      }
      commit( 'setUsers', users )
    } catch ( e ) {
      commit( 'setUsers', [])
    }
  },

  fetchUser: async ({ commit }, { domain, login }) => {
    const request: UsersGetRequest = {
      domain,
      login,
    }
    try {
      const response = await usersApi.usersGet( request )
      commit( 'setUser', response?.items[0] ?? {})
    } catch ( error ) {
      commit( 'setUser', null )
    }
  },

  fetchDomains: async ({ commit }) => {
    const response = await domainsApi.domainsGet()
    if ( typeof response.items !== 'undefined' ) {
      commit( 'setDomains', response.items )
    }
  },

  fetchUserKV: async ({ commit }, { user, key }) => {
    const request: KvUserGetRequest = {
      domain: user.domain,
      login: user.login,
      key,
    }
    try {
      const response = await kvApi.kvUserGet( request )
      commit( 'setUserKV', { key, value: response?.items[0]?.value ?? '' })
    } catch ( e ) {
      commit( 'setUserKV', { key, value: '' })
    }
  },

  updateUserKV: async ({ state }, data: UserKV ) => {
    const request: KvUserSetRequest = {
      domain: data.user.domain,
      login: data.user.login,
      inlineObject10: { ...data },
    }
    await kvApi.kvUserSet( request )
  },

  createUser: async ({ commit }, user: UserCredentials ) => {
    const request: UsersCreateRequest = {
      inlineObject4: {
        login: user.login,
        password: user.password,
        displayName: user.displayName,
      },
    }
    const response = await usersApi.usersCreate( request )
    if ( typeof response === 'undefined' ) {
      commit( 'setUser', user )
      commit( 'addUser', user )
    }
  },

  deleteUser: async ({ commit }, user: User ) => {
    const request: UsersDeleteRequest = {
      domain: user.domain,
      login: user.login,
    }
    const response = await usersApi.usersDelete( request )
    if ( typeof response === 'undefined' ) {
      commit( 'deleteUser', user )
    }
  },

  blockUser: async ({ commit }, { user, blocked }) => {
    const request: UsersBlockRequest | UsersUnblockRequest = {
      domain: user.domain,
      login: user.login,
    }
    if ( blocked ) {
      await usersApi.usersBlock( request )
    } else {
      await usersApi.usersUnblock( request )
    }
    commit( 'setBlockUser', { user, blocked })
  },

  userUpdate: async ({ commit }, user: UserCredentials ) => {
    const request: UsersUpdateRequest = {
      login: user.login,
      inlineObject5: {
        newPassword: user.newPassword,
        displayName: user.displayName,
      },
    }
    const response = await usersApi.usersUpdate( request )
    if ( typeof response === 'undefined' ) {
      commit( 'updateUser', user )
    }
  },

  setUserPermits: async ({ commit, getters, rootGetters }, data: Array<string> ) => {
    const user: UserFull = getters.user
    const oldPermits = getters.userPermits
    const permissions = rootGetters['upCommon/permissions'] as Array<Permission>
    const newPermits = data // permissions.filter( p => data.includes( p.permit )).map
    const lists: AddDelList = getAddDelLists( oldPermits, newPermits )
    const permitsToAdd = permissions.filter( p  => lists.toAdd.includes( p.permit ) )
    const permitsToDel = permissions.filter( p  => lists.toDel.includes( p.permit ) )

    // Добавление разрешений
    for ( const permit of permitsToAdd ) {
      if ( permit.extend?.length ) {
        // устанавливаем расширенные разрешения
        for ( const p of permit.extend ) {
          await kvApi.kvUserSet({
            login: user.login,
            domain: user.domain,
            inlineObject10: { key: p, value: 'true' }
          })
        }
      }
      // устанавливаем выбранное разрешение
      await kvApi.kvUserSet({
        login: user.login,
        domain: user.domain,
        inlineObject10: { key: permit.permit, value: 'true' }
      })
    }
    // Удаление разрешений
    for ( const permit of permitsToDel ) {
      if ( permit.extend?.length ) {
        // удаляем расширенные разрешения
        for ( const p of permit.extend ) {
          try {
            await kvApi.kvUserDelete({
              key: p,
              login: user.login,
              domain: user.domain,
            })
          } catch ( e ) {

          }

        }
      }
      // удаляем выбранное разрешение
      try {
        await kvApi.kvUserDelete({
          key: permit.permit,
          login: user.login,
          domain: user.domain,
        })

      } catch ( e ) {

      }

    }
  },
}

export default {
  actions,
  getters,
  mutations,
  namespaced,
  state: moduleState,
}
