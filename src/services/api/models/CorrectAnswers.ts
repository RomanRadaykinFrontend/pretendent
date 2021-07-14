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
    CorrectAnswer,
    CorrectAnswerFromJSON,
    CorrectAnswerFromJSONTyped,
    CorrectAnswerToJSON,
} from './';

/**
 * list of correct answers
 * @export
 * @interface CorrectAnswers
 */
export interface CorrectAnswers {
    /**
     * 
     * @type {Array<CorrectAnswer>}
     * @memberof CorrectAnswers
     */
    correctAnswers: Array<CorrectAnswer>;
}

export function CorrectAnswersFromJSON(json: any): CorrectAnswers {
    return CorrectAnswersFromJSONTyped(json, false);
}

export function CorrectAnswersFromJSONTyped(json: any, ignoreDiscriminator: boolean): CorrectAnswers {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'correctAnswers': ((json['correct_answers'] as Array<any>).map(CorrectAnswerFromJSON)),
    };
}

export function CorrectAnswersToJSON(value?: CorrectAnswers | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'CorrectAnswers': ((value.correctAnswers as Array<any>).map(CorrectAnswerToJSON)),
    };
}


