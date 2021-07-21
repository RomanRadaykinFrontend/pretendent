import { RequestOpts } from './../api'

export const addAccessTokenToParams = ( request: RequestOpts, accessToken: string ) => {
  if ( !accessToken ) {
    return
  }
  if ( !request?.query ) {
    request.query = {}
  }
  request.query[ 'access_token'] = accessToken
}
