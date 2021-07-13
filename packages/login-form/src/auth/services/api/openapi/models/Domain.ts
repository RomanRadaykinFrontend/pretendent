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
 * @interface Domain
 */
export interface Domain {
    /**
     * LDAP - LDAP or Active Directory
     * ADFS - Active Directory Federation Services
     * local - local domain
     * @type {string}
     * @memberof Domain
     */
    type?: string;
    /**
     *
     * @type {string}
     * @memberof Domain
     */
    name?: string;
}

export function DomainFromJSON(json: any): Domain {
    return DomainFromJSONTyped(json, false);
}

export function DomainFromJSONTyped(json: any, ignoreDiscriminator: boolean): Domain {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'type': !exists(json, 'type') ? undefined : json['type'],
        'name': !exists(json, 'name') ? undefined : json['name'],
    };
}

export function DomainToJSON(value?: Domain | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'type': value.type,
        'name': value.name,
    };
}


