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
 * list of questions with answers
 * @export
 * @interface Questions
 */
export interface Questions {
    /**
     * Question identifier
     * @type {number}
     * @memberof Questions
     */
    id: number;
    /**
     * Code question
     * @type {string}
     * @memberof Questions
     */
    code: string;
    /**
     * Question
     * @type {string}
     * @memberof Questions
     */
    question: string;
    /**
     * Answer options
     * @type {Array<string>}
     * @memberof Questions
     */
    answers: Array<string>;
}

export function QuestionsFromJSON(json: any): Questions {
    return QuestionsFromJSONTyped(json, false);
}

export function QuestionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Questions {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'code': json['code'],
        'question': json['question'],
        'answers': json['answers'],
    };
}

export function QuestionsToJSON(value?: Questions | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'code': value.code,
        'question': value.question,
        'answers': value.answers,
    };
}


