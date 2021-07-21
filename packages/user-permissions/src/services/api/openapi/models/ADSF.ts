/* tslint:disable */
/* eslint-disable */
/**
 * okauth
 * For authorization this spec uses scopes:   - admin. Read/write access to everything. Requires valid access_token and secure_okauth_admin=true KV   - self. Access permissions are method specific. Requires valid access_token  Other scopes are method specific 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ADSF
 */
export interface ADSF {
    /**
     * token that was obtained from ADFS using /auth/{domain}/signin
     * @type {string}
     * @memberof ADSF
     */
    token: string;
    /**
     * state that was passed to /auth/{domain}/signin
     * @type {string}
     * @memberof ADSF
     */
    state: string;
}

export function ADSFFromJSON(json: any): ADSF {
    return ADSFFromJSONTyped(json, false);
}

export function ADSFFromJSONTyped(json: any, ignoreDiscriminator: boolean): ADSF {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': json['token'],
        'state': json['state'],
    };
}

export function ADSFToJSON(value?: ADSF | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
        'state': value.state,
    };
}

