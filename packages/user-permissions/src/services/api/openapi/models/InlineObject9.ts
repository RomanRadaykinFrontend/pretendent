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
 * @interface InlineObject9
 */
export interface InlineObject9 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    domain: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    login: string;
}

export function InlineObject9FromJSON(json: any): InlineObject9 {
    return InlineObject9FromJSONTyped(json, false);
}

export function InlineObject9FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject9 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'domain': json['domain'],
        'login': json['login'],
    };
}

export function InlineObject9ToJSON(value?: InlineObject9 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'domain': value.domain,
        'login': value.login,
    };
}

