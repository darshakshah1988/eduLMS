const enpoint = Object.freeze({
  user: {
    login: "/api/v1/login",
    register: "/api/v1/register",
  },
  private: {
    course: {
      list: "/api/v1/admin/course",
      create: "/api/v1/admin/course/create",
      details: (id) => `/api/v1/admin/course/${id}`,
      lecture: (id) => `/api/v1/admin/course/${id}/lecture`,
      section: { create: `/api/v1/admin/course/section/create` },
      chapter: {
        create: `/api/v1/admin/course/section/lecture/create`,
        videoUpload: (id) =>
          `/api/v1/admin/course/section/lecture/${id}/upload`,
      },
    },
    blog: {
      list: "/api/v1/admin/blog/list",
      create: `/api/v1/admin/blog/create`,
    },
  },
  public: {
    course: {
      list: "/api/v1/courses/list",
      details: (slug) => `/api/v1/courses/${slug}/details`,
    },
    blog: {
      list: "/api/v1/blog/list",
      details: (slug) => `/api/v1/blog/${slug}/details`,
    },
  },
});

export default enpoint;
