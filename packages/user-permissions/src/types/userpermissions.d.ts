import { Group } from '../services/api'
import { DialogStatus } from './../services/helpers/userpermissions'

export interface Region {
  uuid: string
  name: string
}

export interface UserCredentials {
  domain: string
  login: string
  password?: string
  newPassword?: string
  displayName?: string
}

export interface Permission {
  alias?: string
  permit: string
  extend?: Array<string>
}

export interface DialogParams {
  header: string
  buttonCaption: string
  status: DialogStatus
  user?: string
  group?: string
  domain?: string
}

export interface GroupAllKVRequest {
  domain: string;
  ident: string;
}


export interface UpdateGroupPermitPayload {
  group: Group
  permits: {
    original: Array<string>
    new: Array<string>
  }
}

export interface UserKV {
  user: UserCredentials
  key: string;
  value: string
}

export interface GroupUser {
  user: UserCredentials
  ident: string
}

export interface KeyValue {
  key: string
  value: string
}


export interface AddDelList {
  toAdd: Array<any>
  toDel: Array<any>
}
