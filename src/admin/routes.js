import React from "react";
import Blog from "./views/blog/Blog";
import CreateBlog from "./views/blog/CreateBlog";
import EditCourse from "./views/course/Edit";
import CourseStepOne from "./views/course/step/one";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Course = React.lazy(() => import("./views/course/Course"));
// const CourseStepOne = import("./views/course/step/one");
// const EditCourse = React.lazy(() => import("./views/course/Edit"));

const routes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/courses", name: "Course", element: Course },
  {
    path: "/create-course/step/1",
    name: "createCourseStepOne",
    element: CourseStepOne,
  },
  {
    path: "/edit-course/:id",
    name: "EditCourse",
    element: EditCourse,
  },
  { path: "/blogs", name: "Blogs", element: Blog },
  { path: "/blog/create-blog", name: "BlogCreate", element: CreateBlog },
];

export default routes;
