import ApiClient from "../lib/services/axiosClient";
import END_POINTS from "../constants/apiEndpoint.constant";

const singletonApiInstance = new ApiClient();

export const getCourseListForAdminAction = async () => {
  const endUrl = END_POINTS.private.course.list;

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const createCourseStepOne = async (payload) => {
  const endUrl = END_POINTS.private.course.create;

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

export const getCourseDetailsAction = async (id) => {
  const endUrl = END_POINTS.private.course.details(id);

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const getCurriculumAction = async (id) => {
  const endUrl = END_POINTS.private.course.lecture(id);

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const createCourseSection = async (payload) => {
  const endUrl = END_POINTS.private.course.section.create;

  try {
    const result = await singletonApiInstance.postRequest(endUrl, payload);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const createLectureAction = async (payload) => {
  const endUrl = END_POINTS.private.course.chapter.create;

  try {
    const result = await singletonApiInstance.postRequest(endUrl, payload);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const uploadVideoAction = async (id, payload, config) => {
  const endUrl = END_POINTS.private.course.chapter.videoUpload(id);

  try {
    const result = await singletonApiInstance.postRequest(
      endUrl,
      payload,
      {
        "Content-Type": "multipart/form-data",
      },
      config
    );
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const getCourseListAction = async () => {
  const endUrl = END_POINTS.public.course.list;

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};

export const getCourseBySlugAction = async (slug) => {
  const endUrl = END_POINTS.public.course.details(slug);

  try {
    const result = await singletonApiInstance.getRequest(endUrl);
    const response = result?.data;

    return response;
  } catch (error) {
    return error.data;
  }
};
