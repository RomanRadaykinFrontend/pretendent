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
import {
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 *
 * @export
 * @interface InlineResponse2002
 */
export interface InlineResponse2002 {
    /**
     *
     * @type {Array<User>}
     * @memberof InlineResponse2002
     */
    items?: Array<User>;
    /**
     * total amount of pages
     * @type {number}
     * @memberof InlineResponse2002
     */
    totalPages?: number;
}

export function InlineResponse2002FromJSON(json: any): InlineResponse2002 {
    return InlineResponse2002FromJSONTyped(json, false);
}

export function InlineResponse2002FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2002 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {

        'items': !exists(json, 'items') ? undefined : ((json['items'] as Array<any>).map(UserFromJSON)),
        'totalPages': !exists(json, 'total_pages') ? undefined : json['total_pages'],
    };
}

export function InlineResponse2002ToJSON(value?: InlineResponse2002 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {

        'items': value.items === undefined ? undefined : ((value.items as Array<any>).map(UserToJSON)),
        'total_pages': value.totalPages,
    };
}


