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
import { exists } from '../runtime';
export function KVFromJSON(json) {
    return KVFromJSONTyped(json, false);
}
export function KVFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'key': !exists(json, 'key') ? undefined : json['key'],
        'value': !exists(json, 'value') ? undefined : json['value'],
        'groupDomain': !exists(json, 'group_domain') ? undefined : json['group_domain'],
        'groupIdent': !exists(json, 'group_ident') ? undefined : json['group_ident'],
    };
}
export function KVToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'key': value.key,
        'value': value.value,
        'group_domain': value.groupDomain,
        'group_ident': value.groupIdent,
    };
}
//# sourceMappingURL=KV.js.map