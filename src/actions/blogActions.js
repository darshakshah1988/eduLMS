import ApiClient from "../lib/services/axiosClient";
import END_POINTS from "../constants/apiEndpoint.constant";

const singletonApiInstance = new ApiClient();

export const getBlogListForAdminAction = async () => {
  const endUrl = END_POINTS.private.blog.list;

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const createBlogAction = async (payload) => {
  const endUrl = END_POINTS.private.blog.create;

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

export const getBlogListAction = async () => {
  const endUrl = END_POINTS.public.blog.list;

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const getBlogDetailAction = async (slug) => {
  const endUrl = END_POINTS.public.blog.details(slug);

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};
