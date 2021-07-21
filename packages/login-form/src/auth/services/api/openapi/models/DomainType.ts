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

import {
    ADFS,
    LDAP,
    ADFSFromJSONTyped,
    ADFSToJSON,
    LDAPFromJSONTyped,
    LDAPToJSON,
} from './';

/**
 * @type DomainType
 *
 * @export
 */
export type DomainType = ADFS | LDAP;

export function DomainTypeFromJSON(json: any): DomainType {
    return DomainTypeFromJSONTyped(json, false);
}

export function DomainTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): DomainType {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...ADFSFromJSONTyped(json, true), ...LDAPFromJSONTyped(json, true) };
}

export function DomainTypeToJSON(value?: DomainType | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return { ...ADFSToJSON(value as ADFS), ...LDAPToJSON(value as LDAP) };
}