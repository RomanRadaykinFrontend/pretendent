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
import { KVFromJSON, KVToJSON, } from './';
export function InlineResponse2006FromJSON(json) {
    return InlineResponse2006FromJSONTyped(json, false);
}
export function InlineResponse2006FromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'items': !exists(json, 'items') ? undefined : (json['items'].map(KVFromJSON)),
    };
}
export function InlineResponse2006ToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'items': value.items === undefined ? undefined : (value.items.map(KVToJSON)),
    };
}
//# sourceMappingURL=InlineResponse2006.js.map