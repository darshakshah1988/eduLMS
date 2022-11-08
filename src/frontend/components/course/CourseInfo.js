import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const CourseInfo = ({ data }) => {
  const [toggler, setToggler] = useState(false);
  return (
    <div className="eduvibe-sidebar course-details-sidebar">
      <div className="inner">
        <div className="eduvibe-widget">
          <div className="video-area">
            <div className="thumbnail video-popup-wrapper">
              <img
                className="radius-small w-100"
                src={`${process.env.PUBLIC_URL}/images/course/video-bg/course-04.jpg`}
                alt="Course Video Thumb"
              />
              <button
                onClick={() => setToggler(!toggler)}
                className="video-play-btn position-to-top video-popup-activation"
              >
                <span className="play-icon"></span>
              </button>
              {/* <FsLightbox
                toggler={toggler}
                sources={`${process.env.REACT_APP_API_BASE_URL}/static/videos/${data?.sections[0]?.lectures[0]?.video}`}
              /> */}
            </div>
          </div>
          <div className="eduvibe-widget-details mt--35">
            <div className="widget-content">
              <ul>
                {/* {data.duration && ( */}
                <li>
                  <span>
                    <i className="icon-time-line"></i> Duration
                  </span>
                  <span>3h 14m 20s</span>
                </li>
                {/* )} */}
                {/* {data.student && ( */}
                <li>
                  <span>
                    <i className="icon-user-2"></i> Enrolled
                  </span>
                  <span>20</span>
                </li>
                {/* )} */}
                {/* {data.lesson && ( */}
                <li>
                  <span>
                    <i className="icon-draft-line"></i> Lectures
                  </span>
                  <span>2</span>
                </li>
                {/* )} */}
                {data.skill_level && (
                  <li>
                    <span>
                      <i className="icon-bar-chart-2-line"></i> Skill Level
                    </span>
                    <span>{data.skill_level}</span>
                  </li>
                )}
                {data.language && (
                  <li>
                    <span>
                      <i className="icon-translate"></i> Language
                    </span>
                    <span>{data.language}</span>
                  </li>
                )}
                {data.quizzes && (
                  <li>
                    <span>
                      <i className="icon-artboard-line"></i> Quizzes
                    </span>
                    <span>{data.quizzes}</span>
                  </li>
                )}
                {data.certificate && (
                  <li>
                    <span>
                      <i className="icon-award-line"></i> Certificate
                    </span>
                    <span>
                      {data.certificate === "available" ? "Yes" : "No"}
                    </span>
                  </li>
                )}
                {data.pass_percentage && (
                  <li>
                    <span>
                      <img
                        className="eduvibe-course-sidebar-img-icon"
                        src="/images/icons/percent.svg"
                        alt="icon Thumb"
                      />
                      Pass Percentage
                    </span>
                    <span>{data.pass_percentage}%</span>
                  </li>
                )}
                {data.deadline && (
                  <li>
                    <span>
                      <i className="icon-calendar-2-line"></i> Deadline
                    </span>
                    <span>{data.deadline}</span>
                  </li>
                )}
                {data?.users && (
                  <li>
                    <span>
                      <i className="icon-user-2-line_tie"></i> Instructor
                    </span>
                    <span>
                      {data?.users?.firstname} {data?.users?.lastname}
                    </span>
                  </li>
                )}
              </ul>
              <div className="read-more-btn mt--45">
                <a href="#" className="edu-btn btn-bg-alt w-100 text-center">
                  Price: {data.price === "0" ? "Free" : data.price}
                </a>
              </div>
              <div className="read-more-btn mt--15">
                <a href="#" className="edu-btn w-100 text-center">
                  Buy Now
                </a>
              </div>
              <div className="read-more-btn mt--30 text-center">
                <div className="eduvibe-post-share">
                  <span>Share: </span>
                  <a className="linkedin" href="#">
                    <i className="icon-linkedin"></i>
                  </a>
                  <a className="facebook" href="#">
                    <i className="icon-Fb"></i>
                  </a>
                  <a className="twitter" href="#">
                    <i className="icon-Twitter"></i>
                  </a>
                  <a className="youtube" href="#">
                    <i className="icon-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
