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
import { QuestionsFromJSON, QuestionsToJSON, } from './';
export function QuestionsItemsFromJSON(json) {
    return QuestionsItemsFromJSONTyped(json, false);
}
export function QuestionsItemsFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'questions': (json.map(QuestionsFromJSON)),
    };
}
export function QuestionsItemsToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'questions': (value.questions.map(QuestionsToJSON)),
    };
}
//# sourceMappingURL=QuestionsItems.js.map