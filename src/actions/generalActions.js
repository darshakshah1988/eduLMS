import ApiClient from "../lib/services/axiosClient";
import END_POINTS from "../constants/apiEndpoint.constant";

const singletonApiInstance = new ApiClient();

export const uploadImageAction = async (payload) => {
  const endUrl = END_POINTS.private.imageupload;

  try {
    const result = await singletonApiInstance.postRequest(endUrl, payload, {
      "Content-Type": "multipart/form-data",
    });
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const uploadVideoAction = async (payload) => {
  const endUrl = END_POINTS.private.videoupload;

  try {
    const result = await singletonApiInstance.postRequest(endUrl, payload, {
      "Content-Type": "multipart/form-data",
    });
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};
