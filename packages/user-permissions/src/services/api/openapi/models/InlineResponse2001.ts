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
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2001
     */
    accessToken?: string;
}

export function InlineResponse2001FromJSON(json: any): InlineResponse2001 {
    return InlineResponse2001FromJSONTyped(json, false);
}

export function InlineResponse2001FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2001 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'accessToken': !exists(json, 'access_token') ? undefined : json['access_token'],
    };
}

export function InlineResponse2001ToJSON(value?: InlineResponse2001 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'access_token': value.accessToken,
    };
}


