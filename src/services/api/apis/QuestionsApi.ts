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


import * as runtime from '../runtime';
import {
    CorrectAnswers,
    CorrectAnswersFromJSON,
    CorrectAnswersToJSON,
    Message,
    MessageFromJSON,
    MessageToJSON,
    QuestionsItems,
    QuestionsItemsFromJSON,
    QuestionsItemsToJSON,
} from '../models';

/**
 * 
 */
export class QuestionsApi extends runtime.BaseAPI {

    /**
     * List correct Answers
     */
    async correctRaw(): Promise<runtime.ApiResponse<CorrectAnswers>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/questions/correct`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CorrectAnswersFromJSON(jsonValue));
    }

    /**
     * List correct Answers
     */
    async correct(): Promise<CorrectAnswers> {
        const response = await this.correctRaw();
        return await response.value();
    }

    /**
     * List Questions
     */
    async questionsRaw(): Promise<runtime.ApiResponse<QuestionsItems>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/questions`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => QuestionsItemsFromJSON(jsonValue));
    }

    /**
     * List Questions
     */
    async questions(): Promise<QuestionsItems> {
        const response = await this.questionsRaw();
        return await response.value();
    }

}
