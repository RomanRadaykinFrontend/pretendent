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
 * @interface Group
 */
export interface Group {
    /**
     * domain name the group is part of
     * @type {string}
     * @memberof Group
     */
    domain?: string;
    /**
     * group unique identifier withing the domain
     * @type {string}
     * @memberof Group
     */
    ident?: string;
    /**
     * user friendly name
     * @type {string}
     * @memberof Group
     */
    displayName?: string;
}

export function GroupFromJSON(json: any): Group {
    return GroupFromJSONTyped(json, false);
}

export function GroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): Group {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'domain': !exists(json, 'domain') ? undefined : json['domain'],
        'ident': !exists(json, 'ident') ? undefined : json['ident'],
        'displayName': !exists(json, 'display_name') ? undefined : json['display_name'],
    };
}

export function GroupToJSON(value?: Group | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'domain': value.domain,
        'ident': value.ident,
        'display_name': value.displayName,
    };
}


