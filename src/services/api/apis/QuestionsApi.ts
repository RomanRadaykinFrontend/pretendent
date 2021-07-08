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
    Message,
    MessageFromJSON,
    MessageToJSON,
    QuestionsRes,
    QuestionsResFromJSON,
    QuestionsResToJSON,
} from '../models';

/**
 * 
 */
export class QuestionsApi extends runtime.BaseAPI {

    /**
     * List Questions
     */
    async questionsRaw(): Promise<runtime.ApiResponse<QuestionsRes>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/questions`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => QuestionsResFromJSON(jsonValue));
    }

    /**
     * List Questions
     */
    async questions(): Promise<QuestionsRes> {
        const response = await this.questionsRaw();
        return await response.value();
    }

}
