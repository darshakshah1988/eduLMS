import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { slugify } from "../../utils";
import SEO from "../../common/SEO";
import Layout from "../../common/Layout";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import SearchOne from "../../components/widgets/blog/SearchOne";
import CategoryOne from "../../components/widgets/blog/CategoryOne";
import LatestPostOne from "../../components/widgets/blog/LatestPostOne";
import TagOne from "../../components/widgets/blog/TagOne";
import BannerOne from "../../components/widgets/blog/BannerOne";
import Comment from "../blog/Comment";
import PostData from "../../data/blog/PostData.json";
import { getBlogDetailAction } from "src/actions/blogActions";
import moment from "moment";

const BlogDetailsThree = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    getBlogDetailAction(slug)
      .then((response) => {
        if (response.status) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  return (
    <>
      <SEO title={data?.title} />
      <Layout>
        <BreadcrumbOne
          title={data?.title}
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Blog Details"
        />
        <div className="edu-blog-details-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8">
                <div className="blog-details-1 style-variation2">
                  <div className="content-blog-top">
                    <div className="thumbnail">
                      <img
                        className="radius-small w-100 mb--30"
                        src={`${process.env.REACT_APP_API_BASE_URL}/static/blog/${data?.image}`}
                        alt="Blog Thumb"
                      />
                    </div>
                    <ul className="blog-meta">
                      <li className="blog-author">
                        <img
                          src="/images/blog/author/author-small/author.png"
                          alt="Blog Images"
                        />{" "}
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            `/author/${slugify(data?.users?.firstname)}`
                          }
                        >
                          {data?.users?.firstname} {data?.users?.lastname}
                        </Link>
                      </li>
                      <li>
                        <i className="icon-calendar-2-line"></i>
                        {moment(data?.createdAt).format("Do MMM, YYYY")}
                      </li>
                      <li>
                        <i className="icon-discuss-line"></i>
                        {/* {data?.comment} */}0 Comments
                      </li>
                      <li>
                        <i className="icon-time-line"></i>
                        {data?.readingTime}
                      </li>
                    </ul>
                    <h4 className="title">{data?.title}</h4>
                  </div>

                  <div
                    className="blog-main-content ck-content"
                    dangerouslySetInnerHTML={{
                      __html: data?.details,
                    }}
                  />

                  <div className="blog-tag-and-share mt--50">
                    {data?.tags && data?.tags.length > 0 && (
                      <div className="blog-tag">
                        <div className="tag-list bg-shade">
                          {data?.tags.map((tag, i) => {
                            return (
                              <Link
                                key={i}
                                to={
                                  process.env.PUBLIC_URL +
                                  `/tag/${slugify(tag)}`
                                }
                              >
                                {tag}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
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

                  <div className="blog-author-wrapper">
                    <div className="thumbnail">
                      <img
                        src="/images/blog/author/author-medium/author-02.jpg"
                        alt="Author Images"
                      />
                    </div>
                    <div className="author-content">
                      <h6 className="title">John Smith</h6>
                      <p>
                        Jhon Smith is an author, blogger, and designer living in
                        a suburb of Washington, DC. When she’s not designing,
                        blogging, or writing, Owen can be found with her head in
                        a book or pinning like a madman.
                      </p>
                      <ul className="social-share icon-transparent">
                        <li>
                          <a href="#">
                            <i className="icon-Fb"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon-Pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon-Twitter"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className="blog-pagination">
                    <div className="row g-5">
                      <div className="col-lg-6">
                        <div className="blog-pagination-list style-variation-2">
                          <a href="#">
                            <i className="ri-arrow-left-s-line"></i>
                            <span>
                              Social Media & evolution of visual design
                            </span>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="blog-pagination-list style-variation-2 next-post">
                          <a href="#">
                            <span>
                              Many important brands have given us their trust
                            </span>
                            <i className="ri-arrow-right-s-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="edu-comment-form mt--50">
                    <Comment url="" id={data?.id} title={data?.title} />
                  </div> */}
                </div>
              </div>
              <div className="col-lg-4">
                <aside className="edu-blog-sidebar">
                  <SearchOne style2="enable" />
                  <CategoryOne extraClass="mt--50" style2="enable" />
                  {/* <LatestPostOne extraClass="mt--50" style2="enable" /> */}
                  {/* <BannerOne extraClass="mt--50" /> */}
                  <TagOne extraClass="mt--50" style2="enable" />
                </aside>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlogDetailsThree;
