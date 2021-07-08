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
import {
    Answer,
    AnswerFromJSON,
    AnswerFromJSONTyped,
    AnswerToJSON,
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface UserRes
 */
export interface UserRes {
    /**
     * 
     * @type {User}
     * @memberof UserRes
     */
    user?: User;
    /**
     * Percentage of correct answers
     * @type {number}
     * @memberof UserRes
     */
    readonly percent?: number;
    /**
     * 
     * @type {Array<Answer>}
     * @memberof UserRes
     */
    answers?: Array<Answer>;
}

export function UserResFromJSON(json: any): UserRes {
    return UserResFromJSONTyped(json, false);
}

export function UserResFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'user': !exists(json, 'user') ? undefined : UserFromJSON(json['user']),
        'percent': !exists(json, 'percent') ? undefined : json['percent'],
        'answers': !exists(json, 'answers') ? undefined : ((json['answers'] as Array<any>).map(AnswerFromJSON)),
    };
}

export function UserResToJSON(value?: UserRes | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user': UserToJSON(value.user),
        'answers': value.answers === undefined ? undefined : ((value.answers as Array<any>).map(AnswerToJSON)),
    };
}


