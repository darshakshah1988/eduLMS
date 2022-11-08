import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseFilterSidebar from "./pages/course/CourseFilterSidebar";
import AboutUs from "./pages/innerpages/AboutUs";
import BlogGridOne from "./pages/blog/BlogGridOne";
import BlogGridTwo from "./pages/blog/BlogGridTwo";
import BlogGridThree from "./pages/blog/BlogGridThree";
import BlogCarousel from "./pages/blog/BlogCarousel";
import BlogLoadMore from "./pages/blog/BlogLoadMore";
import BlogStandard from "./pages/blog/BlogStandard";
import BlogGridRightSidebar from "./pages/blog/BlogGridRightSidebar";
import BlogGridLeftSidebar from "./pages/blog/BlogGridLeftSidebar";
import BlogDetailsOne from "./pages/detailspages/BlogDetailsOne";
import BlogDetailsTwo from "./pages/detailspages/BlogDetailsTwo";
import BlogDetailsThree from "./pages/detailspages/BlogDetailsThree";
import CategoryArchive from "./pages/archive/CategoryArchive";
import TagArchive from "./pages/archive/TagArchive";
import AuthorArchive from "./pages/archive/AuthorArchive";
import ComingSoon from "./pages/innerpages/ComingSoon";
import ContactMe from "./pages/innerpages/ContactMe";
import ContactUs from "./pages/innerpages/ContactUs";
import CourseOne from "./pages/course/CourseOne";
import CourseFilterOne from "./pages/course/CourseFilterOne";
import CourseFilterTwo from "./pages/course/CourseFilterTwo";
import CourseCarousel from "./pages/course/CourseCarousel";
import CourseLoadMore from "./pages/course/CourseLoadMore";
import CourseCategoryArchive from "./pages/archive/CourseCategoryArchive";
import CourseDetails from "./pages/detailspages/CourseDetails";
import CourseDetailsTwo from "./pages/detailspages/CourseDetailsTwo";
import EventGrid from "./pages/innerpages/EventGrid";
import EventList from "./pages/innerpages/EventList";
import EventLoadMore from "./pages/innerpages/EventLoadMore";
import EventCarousel from "./pages/innerpages/EventCarousel";
import EventDetails from "./pages/detailspages/EventDetails";
import Faq from "./pages/innerpages/Faq";
import GalleryGrid from "./pages/innerpages/GalleryGrid";
import GalleryMasonry from "./pages/innerpages/GalleryMasonry";
import GalleryLoadMore from "./pages/innerpages/GalleryLoadMore";
import Home from "./pages/homepages/Home";
import InstructorPageOne from "./pages/innerpages/InstructorPageOne";
import InstructorPageTwo from "./pages/innerpages/InstructorPageTwo";
import InstructorPageThree from "./pages/innerpages/InstructorPageThree";
import LoginRegister from "./pages/innerpages/LoginRegister";
import Pricing from "./pages/innerpages/Pricing";
import PrivacyPolicy from "./pages/innerpages/PrivacyPolicy";
import PurchaseGuide from "./pages/innerpages/PurchaseGuide";
import Testimonial from "./pages/innerpages/Testimonial";
import InstructorDetails from "./pages/detailspages/InstructorDetails";
import Error from "./pages/innerpages/Error";

// Import Css Here
import "./assets/scss/style.scss";
function Frontend() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/about-us"}`}
        element={<AboutUs />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/coming-soon"}`}
        element={<ComingSoon />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/contact-me"}`}
        element={<ContactMe />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/contact-us"}`}
        element={<ContactUs />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/courses"}`}
        element={<CourseOne />}
      />

      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/course-filter-1"}`}
        element={<CourseFilterOne />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/course-filter-2"}`}
        element={<CourseFilterTwo />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/course-carousel"}`}
        element={<CourseCarousel />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/course-load-more"}`}
        element={<CourseLoadMore />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/course-category/:slug"}`}
        element={<CourseCategoryArchive />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/course-details/:slug"}`}
        element={<CourseDetails />}
      />

      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/event-grid"}`}
        element={<EventGrid />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/event-list"}`}
        element={<EventList />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/event-load-more"}`}
        element={<EventLoadMore />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/event-carousel"}`}
        element={<EventCarousel />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/event-details/:id"}`}
        element={<EventDetails />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/faq"}`}
        element={<Faq />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/gallery-grid"}`}
        element={<GalleryGrid />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/gallery-masonry"}`}
        element={<GalleryMasonry />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/gallery-load-more"}`}
        element={<GalleryLoadMore />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/instructor-one"}`}
        element={<InstructorPageOne />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/instructor-two"}`}
        element={<InstructorPageTwo />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/instructor-three"}`}
        element={<InstructorPageThree />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/pricing"}`}
        element={<Pricing />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/privacy-policy"}`}
        element={<PrivacyPolicy />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/purchase-guide"}`}
        element={<PurchaseGuide />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/testimonial"}`}
        element={<Testimonial />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/instructor-details/:slug"}`}
        element={<InstructorDetails />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/blog-grid-1"}`}
        element={<BlogGridOne />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/blog"}`}
        element={<BlogGridTwo />}
      />

      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/login"}`}
        element={<LoginRegister />}
      />

      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/blog/:slug"}`}
        element={<BlogDetailsThree />}
      />

      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/category/:slug"}`}
        element={<CategoryArchive />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/tag/:slug"}`}
        element={<TagArchive />}
      />
      <Route
        exact
        path={`${process.env.PUBLIC_URL + "/author/:slug"}`}
        element={<AuthorArchive />}
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default Frontend;
