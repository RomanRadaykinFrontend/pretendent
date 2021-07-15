import { difference, intersection, isEqual } from 'lodash'
import { SortType } from '../../types/common'
import { AddDelList } from '../../types/userpermissions'

export const sortItems = ( items: Array<any>, key: string, direction: 'asc' | 'desc' = 'asc' ): Array<any> => {
  if ( !items ) {
    return items
  }
  for ( const item of items ) {
    if ( typeof item[key] === 'undefined' ) {
      item[key] = ''
    }
  }
  return [ ...items ].sort( ( a, b ) => {
    if( a[key].toLowerCase() === b[key].toLowerCase() ){
      return 0
    } else {
      return direction === 'asc' ?
        a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1 :
        a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    }
  })
}


// export const sortItems = ( items: Array<any>, key: string ): Array<any> => {
//   if ( !items || !key ) {
//     return items
//   }
//   return items.sort( ( a, b ) => ( a[key] ?? '' ) > ( b[key] ?? '' ) ? 1 : -1 )
// }


export const changeSort = ( field: string, sortObj: SortType ) => {
  if( field !== sortObj.field ){
    sortObj.field = field
    sortObj.direction = 'desc'
  } else {
    sortObj.direction = sortObj.direction === 'asc' ? 'desc' : 'asc'
  }
}

export const SECURE_REGIONS = 'secure_regions'
export const SECURE_OKAUTH_ADMIN = 'secure_okauth_admin'

export enum DialogStatus {
  BLOCK_USER = 'BLOCK_USER',
  DELETE_USER = 'DELETE_USER',
  DELETE_GROUP = 'DELETE_GROUP',
  UNBLOCK_USER = 'UNBLOCK_USER',
  DELETE_GROUP_USER = 'DELETE_GROUP_USER',
}

export const getAddDelLists = (
  sourceList: Array<any>,  newList: Array<any>,  keyField?: string,
): AddDelList => {
  const result: AddDelList = { toAdd: [], toDel: [] }
  let a = sourceList
  let b = newList
  if ( keyField ) {
    a = sortItems( sourceList, keyField )
    b = sortItems( newList, keyField )
    if ( isEqual( a, b ) ) {
      return result
    }
    a = a.map( c => c[keyField])
    b = b.map( c => c[keyField])
  }
  const common = intersection( a, b )
  // result.toDel = Array.from( new Set( difference( a, common ) ))
  // result.toAdd = Array.from( new Set( difference( b, common ) ))
  result.toDel = difference( a, common )
  result.toAdd = difference( b, common )
  return result
}
