import axios from "axios";
import { store } from "../../store";
import * as ActionTypes from "../../actions/Types";
import { Router } from "react-router-dom";

export default class ApiClient {
  constructor() {
    if (!ApiClient.instance) {
      ApiClient.instance = this;
    }
    return ApiClient.instance;
  }

  getCommonHeaders = () => {
    // Generic headers common for all apis
    const internalState = store?.getState();
    const token = internalState?.userInfo?.userInfo?.token;
    let commonHeaders = {
      "Content-Type": "application/json",
    };
    if (token) {
      commonHeaders = {
        ...commonHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
    return commonHeaders;
  };

  getCommonQueries = () => ({});

  creatAxiosInstance = () => {
    this.axiosClient = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      timeout: 55000,
    });

    /**
     *Descriptiom: Axios Interceptor for Request
     */
    this.axiosClient.interceptors.request.use(
      async (request) => request,
      (error) => Promise.reject(error)
    );

    /**
     *Descriptiom: Axios Interceptor for Response
     */
    this.axiosClient.interceptors.response.use(
      (response) => {
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 202
        ) {
          return response;
        }
      },
      (error) => {
        if (error.response.status === 401) {
          store.dispatch({
            type: ActionTypes.USER_LOGOUT,
          });
          Router.push("/login");
        }

        return error.response;
      }
    );
  };

  /**
   * Description: Executes a Get Request
   * @param {string} endUrl request Url
   * @param {Object} headers headers specific to current request
   * @param {Object} queryParams request query parameters
   * @returns {Promise} returns a promise of response
   */

  getRequest = (endUrl, queryParams, headers) => {
    let requestHeaders = this.getCommonHeaders();
    if (headers) {
      requestHeaders = { ...requestHeaders, ...headers };
    }

    let requestQueries = this.getCommonQueries();
    if (queryParams) {
      requestQueries = { ...requestQueries, ...queryParams };
    }
    return this.axiosClient.get(endUrl, {
      params: requestQueries,
      headers: requestHeaders,
    });
  };

  /**
   * Description: Executes a Post Request
   * @param {string} endUrl request Url
   * @param {Object} headers headers specific to current request
   * @param {Object} body request body
   * @returns {Promise} returns a promise of response
   */
  postRequest = (endUrl, body, headers, config, timeoutInms) => {
    let requestHeaders = this.getCommonHeaders();
    if (headers) {
      requestHeaders = { ...requestHeaders, ...headers };
    }

    if (timeoutInms) {
      return this.axiosClient.post(endUrl, body, {
        headers: requestHeaders,
        timeout: timeoutInms,
      });
    }
    if (config) {
      return this.axiosClient.post(endUrl, body, {
        headers: requestHeaders,
        ...config,
      });
    }
    return this.axiosClient.post(endUrl, body, {
      headers: requestHeaders,
    });
  };

  /**
   * Description: Executes a patch Request
   * @param {string} endUrl request Url
   * @param {Object} headers headers specific to current request
   * @param {Object} queryParams request query parameters
   * @returns {Promise} returns a promise of response
   */
  patchRequest = (endUrl, postParams, queryParams, headers) => {
    let requestHeaders = this.getCommonHeaders();
    if (headers) {
      requestHeaders = { ...requestHeaders, ...headers };
    }

    let requestQueries = this.getCommonQueries();
    if (queryParams) {
      requestQueries = { ...requestQueries, ...queryParams };
    }

    return this.axiosClient.patch(endUrl, postParams, {
      params: requestQueries,
      headers: requestHeaders,
    });
  };

  /**
   * Description: Executes a delete Request
   * @param {string} endUrl request Url
   * @param {Object} headers headers specific to current request
   * @param {Object} queryParams request query parameters
   * @returns {Promise} returns a promise of response
   */
  deleteRequest = (endUrl, queryParams, requestBody, headers) => {
    let requestHeaders = this.getCommonHeaders();
    if (headers) {
      requestHeaders = { ...requestHeaders, ...headers };
    }

    let requestQueries = this.getCommonQueries();
    if (queryParams) {
      // eslint-disable-next-line no-unused-vars
      requestQueries = { ...requestQueries, ...queryParams };
    }
    return this.axiosClient.delete(endUrl, {
      headers: requestHeaders,
      data: requestBody,
    });
  };

  /**
   * Description: Executes a Put Request
   * @param {string} endUrl request Url
   * @param {Object} headers headers specific to current request
   * @param {Object} queryParams request query parameters
   * @returns {Promise} returns a promise of response
   */
  putRequest = (endUrl, postParams, headers, config) => {
    let requestHeaders = this.getCommonHeaders();
    if (headers) {
      requestHeaders = { ...requestHeaders, ...headers };
    }
    if (config) {
      return this.axiosClient.put(endUrl, postParams, {
        headers: requestHeaders,
        ...config,
      });
    }
    return this.axiosClient.put(endUrl, postParams, {
      headers: requestHeaders,
    });
  };
}
