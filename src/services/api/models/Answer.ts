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
 * Add new answer
 * @export
 * @interface Answer
 */
export interface Answer {
    /**
     * Question number
     * @type {number}
     * @memberof Answer
     */
    question: number;
    /**
     * Answer to the question on this number
     * @type {number}
     * @memberof Answer
     */
    answer: number;
}

export function AnswerFromJSON(json: any): Answer {
    return AnswerFromJSONTyped(json, false);
}

export function AnswerFromJSONTyped(json: any, ignoreDiscriminator: boolean): Answer {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'question': json['question'],
        'answer': json['answer'],
    };
}

export function AnswerToJSON(value?: Answer | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'question': value.question,
        'answer': value.answer,
    };
}


