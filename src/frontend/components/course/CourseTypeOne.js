import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../../utils";

const CourseTypeOne = ({ data, classes }) => {
  return (
    <div
      className={`edu-card card-type-3 radius-small ${classes ? classes : ""}`}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link to={process.env.PUBLIC_URL + `/course-details/${data.slug}`}>
            <img
              className="w-100"
              src={`${process.env.PUBLIC_URL}/images/course/course-01/course-01.jpg`}
              alt="Course Thumb"
            />
          </Link>
          <div className="wishlist-top-right">
            <button className="wishlist-btn">
              <i className="icon-Heart"></i>
            </button>
          </div>
          <div className="top-position status-group left-bottom">
            <Link
              className="eduvibe-status status-03"
              to={
                process.env.PUBLIC_URL +
                `/course-category/${slugify(data.skill)}`
              }
            >
              {data.skill}
            </Link>
          </div>
        </div>
        <div className="content">
          <div className="card-top">
            <div className="author-meta">
              <div className="author-thumb">
                <Link
                  to={
                    process.env.PUBLIC_URL +
                    `/instructor-details/${slugify(data.users.firstname)}`
                  }
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/instructor/instructor-small/instructor-1.jpg`}
                    alt="Author Thumb"
                  />
                  <span className="author-title">
                    {data.users.firstname} {data.users.lastname}
                  </span>
                </Link>
              </div>
            </div>
            <ul className="edu-meta meta-02">
              <li>
                <i className="icon-file-list-3-line"></i>2 Lessons
              </li>
            </ul>
          </div>
          <h6 className="title">
            <Link to={process.env.PUBLIC_URL + `/course-details/${data.id}`}>
              {data.title}
            </Link>
          </h6>
          <div className="card-bottom">
            <div className="price-list price-style-02">
              <div className="price current-price">Free</div>
              {/* {data.price === "0" ? (
                <div className="price current-price">Free</div>
              ) : (
                <div className="price current-price">${data.price}</div>
              )}
              {data.oldPrice && (
                <div className="price old-price">${data.oldPrice}</div>
              )} */}
            </div>
            <div className="edu-rating rating-default">
              <div className="rating eduvibe-course-rating-stars">
                <i className="icon-Star"></i>
                <i className="icon-Star"></i>
                <i className="icon-Star"></i>
                <i className="icon-Star"></i>
                <i className="icon-Star"></i>
              </div>
              <span className="rating-count">({/* {data.rating} */}0 )</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-hover-action">
        <div className="hover-content">
          <div className="content-top">
            <div className="top-status-bar">
              <Link
                className="eduvibe-status status-03"
                to={
                  process.env.PUBLIC_URL +
                  `/course-category/${slugify(data.skill)}`
                }
              >
                {data.skill}
              </Link>
            </div>
            <div className="top-wishlist-bar">
              <button className="wishlist-btn">
                <i className="icon-Heart"></i>
              </button>
            </div>
          </div>

          <h6 className="title">
            <Link to={process.env.PUBLIC_URL + `/course-details/${data.slug}`}>
              {data.title}
            </Link>
          </h6>

          <p className="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since
          </p>

          <div className="price-list price-style-02">
            {/* {data.price === "0" ? (
              <div className="price current-price">Free</div>
            ) : (
              <div className="price current-price">${data.price}</div>
            )}
            {data.oldPrice && (
              <div className="price old-price">${data.oldPrice}</div>
            )} */}
          </div>

          <div className="hover-bottom-content">
            <div className="author-meta">
              <div className="author-thumb">
                <Link
                  to={
                    process.env.PUBLIC_URL +
                    `/instructor-details/${slugify(data.users.firstname)}`
                  }
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/instructor/instructor-small/instructor-1.jpg`}
                    alt="Author Thumb"
                  />
                  <span className="author-title">
                    {data.users.firstname} {data.users.lastname}
                  </span>
                </Link>
              </div>
            </div>
            <ul className="edu-meta meta-02">
              <li>
                <i className="icon-file-list-3-line"></i>2 Lessons
              </li>
            </ul>
          </div>
          <div className="read-more-btn">
            <Link
              className="edu-btn btn-medium btn-white"
              to={process.env.PUBLIC_URL + `/course-details/${data.slug}`}
            >
              Enroll Now<i className="icon-arrow-right-line-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseTypeOne;
