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
 * @interface InlineObject7
 */
export interface InlineObject7 {
    /**
     *
     * @type {string}
     * @memberof InlineObject7
     */
    displayName?: string;
}

export function InlineObject7FromJSON(json: any): InlineObject7 {
    return InlineObject7FromJSONTyped(json, false);
}

export function InlineObject7FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject7 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'displayName': !exists(json, 'display_name') ? undefined : json['display_name'],
    };
}

export function InlineObject7ToJSON(value?: InlineObject7 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'display_name': value.displayName,
    };
}

