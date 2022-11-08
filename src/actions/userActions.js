import ApiClient from "../lib/services/axiosClient";
import END_POINTS from "../constants/apiEndpoint.constant";
import * as ActionTypes from "./Types";

const singletonApiInstance = new ApiClient();

export const loginAction = (requestBody) => async (dispatch) => {
  const endUrl = END_POINTS.user.login;

  try {
    const result = await singletonApiInstance.postRequest(endUrl, requestBody);
    const response = result?.data;
    if (response?.status) {
      const userInfo = response.user;
      userInfo.token = response.token;
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: userInfo,
      });
    }
    return response;
  } catch (error) {
    return error.data;
  }
};

export const registerAction = (requestBody) => async (dispatch) => {
  const endUrl = END_POINTS.user.register;

  try {
    const result = await singletonApiInstance.postRequest(endUrl, requestBody);
    const response = result?.data;
    if (response?.status) {
      const userInfo = response.user;
      userInfo.token = response.token;
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: userInfo,
      });
    }
    return response;
  } catch (error) {
    return error.data;
  }
};
