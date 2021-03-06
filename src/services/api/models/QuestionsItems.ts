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
    Questions,
    QuestionsFromJSON,
    QuestionsFromJSONTyped,
    QuestionsToJSON,
} from './';

/**
 * List of questions
 * @export
 * @interface QuestionsItems
 */
export interface QuestionsItems {
    /**
     * 
     * @type {Array<Questions>}
     * @memberof QuestionsItems
     */
    questions: Array<Questions>;
}

export function QuestionsItemsFromJSON(json: any): QuestionsItems {
    return QuestionsItemsFromJSONTyped(json, false);
}

export function QuestionsItemsFromJSONTyped(json: any, ignoreDiscriminator: boolean): QuestionsItems {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'questions': ((json['questions'] as Array<any>).map(QuestionsFromJSON)),
    };
}

export function QuestionsItemsToJSON(value?: QuestionsItems | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'questions': ((value.questions as Array<any>).map(QuestionsToJSON)),
    };
}


