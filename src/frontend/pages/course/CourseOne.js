import React, { useEffect, useState } from "react";
import SEO from "../../common/SEO";
import Layout from "../../common/Layout";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import CourseTypeOne from "../../components/course/CourseTypeOne";
import CourseData from "../../data/course/CourseData.json";
import { getCourseListAction } from "src/actions/courseActions";

const CourseOne = () => {
  // const CourseItems = CourseData.slice(0, 9);
  const [visibleItems, setVisibleItems] = useState([]);
  useEffect(() => {
    getCourseListAction().then((response) => {
      if (response.status) {
        setVisibleItems(response.data);
      }
    });
  }, []);

  return (
    <>
      <SEO title="Courses" />
      <Layout>
        <BreadcrumbOne
          title="Courses"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Courses"
        />
        <div className="edu-course-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5 mt--10">
              {visibleItems.map((item) => (
                <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                  <CourseTypeOne data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CourseOne;
