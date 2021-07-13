export interface LoginData {
  domain: string,
  domainType: string,
  login: string,
  password: string,
  token?: string,
  state?: string
  isADFS?: boolean
}

export interface ADFSData {
  state: string,
  token: string,
}
