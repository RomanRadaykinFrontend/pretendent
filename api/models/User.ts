/* tslint:disable */
/* eslint-disable */
/**
 * Pretendent backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * User
 * @export
 * @interface User
 */
export interface User {
    /**
     * User name
     * @type {string}
     * @memberof User
     */
    name: string;
    /**
     * User last name
     * @type {string}
     * @memberof User
     */
    lastName: string;
    /**
     * User email
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * User telegram
     * @type {string}
     * @memberof User
     */
    telegram: string;
    /**
     * User creation time
     * @type {Date}
     * @memberof User
     */
    readonly timeCreate?: Date;
    /**
     * User uuid
     * @type {string}
     * @memberof User
     */
    readonly userGUID?: string;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'lastName': json['lastName'],
        'email': json['email'],
        'telegram': json['telegram'],
        'timeCreate': !exists(json, 'timeCreate') ? undefined : (new Date(json['timeCreate'])),
        'userGUID': json['userGUID'],
    };
}

export function UserToJSON(value?: User | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'lastName': value.lastName,
        'email': value.email,
        'telegram': value.telegram,
    };
}


