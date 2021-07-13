/* tslint:disable */
/* eslint-disable */
/**
 * okauth
 * For authorization this spec uses scopes:   - admin. Read/write access to everything. Requires valid access_token and secure_okauth_admin=true KV   - self. Access permissions are method specific. Requires valid access_token  Other scopes are method specific
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    InlineResponse2007,
    InlineResponse2007FromJSON,
    InlineResponse2007ToJSON,
} from '../models';

export interface DomainDeleteRequest {
    domain: string;
}

/**
 *
 */
export class DomainsApi extends runtime.BaseAPI {

    /**
     * remove all users and groups from a domain.  Allowed scopes:   - admin
     */
    async domainDeleteRaw(requestParameters: DomainDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.domain === null || requestParameters.domain === undefined) {
            throw new runtime.RequiredError('domain','Required parameter requestParameters.domain was null or undefined when calling domainDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["access_token"] = this.configuration.apiKey("access_token"); // AccessToken authentication
        }

        const response = await this.request({
            path: `/domains/{domain}`.replace(`{${"domain"}}`, encodeURIComponent(String(requestParameters.domain))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * remove all users and groups from a domain.  Allowed scopes:   - admin
     */
    async domainDelete(requestParameters: DomainDeleteRequest): Promise<void> {
        await this.domainDeleteRaw(requestParameters);
    }

    /**
     * returns all registered domains
     */
    async domainsGetRaw(): Promise<runtime.ApiResponse<InlineResponse2007>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/domains`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => InlineResponse2007FromJSON(jsonValue));
    }

    /**
     * returns all registered domains
     */
    async domainsGet(): Promise<InlineResponse2007> {
        const response = await this.domainsGetRaw();
        return await response.value();
    }

}
