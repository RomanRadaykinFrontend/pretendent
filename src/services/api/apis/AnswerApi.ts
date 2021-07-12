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
    Answers,
    AnswersFromJSON,
    AnswersToJSON,
    Message,
    MessageFromJSON,
    MessageToJSON,
} from '../models';

export interface AddNewAnswersRequest {
    answers: Answers;
}

/**
 * 
 */
export class AnswerApi extends runtime.BaseAPI {

    /**
     * Add new answers
     */
    async addNewAnswersRaw(requestParameters: AddNewAnswersRequest): Promise<runtime.ApiResponse<Message>> {
        if (requestParameters.answers === null || requestParameters.answers === undefined) {
            throw new runtime.RequiredError('answers','Required parameter requestParameters.answers was null or undefined when calling addNewAnswers.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/answer`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AnswersToJSON(requestParameters.answers),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => MessageFromJSON(jsonValue));
    }

    /**
     * Add new answers
     */
    async addNewAnswers(requestParameters: AddNewAnswersRequest): Promise<Message> {
        const response = await this.addNewAnswersRaw(requestParameters);
        return await response.value();
    }

}
