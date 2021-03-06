/* tslint:disable */
/* eslint-disable */
/**
 * Pretendent backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Common server message object
 * @export
 * @interface Message
 */
export interface Message {
    /**
     * - 1 - unknown error, read message
     * - 2 - entity not found
     * - 3 - database error
     * - 4 - bad request params
     * - 5 - bad page request params
     * - 6 - bad request body
     * @type {number}
     * @memberof Message
     */
    errorCode: number;
    /**
     * Server message
     * @type {string}
     * @memberof Message
     */
    message: string;
}

export function MessageFromJSON(json: any): Message {
    return MessageFromJSONTyped(json, false);
}

export function MessageFromJSONTyped(json: any, ignoreDiscriminator: boolean): Message {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'errorCode': json['errorCode'],
        'message': json['message'],
    };
}

export function MessageToJSON(value?: Message | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'errorCode': value.errorCode,
        'message': value.message,
    };
}


