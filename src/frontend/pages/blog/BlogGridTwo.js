import React, { useEffect, useState } from "react";
import SEO from "../../common/SEO";
import Layout from "../../common/Layout";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import PaginationOne from "../../components/pagination/PaginationOne";
import PostTwo from "../../components/post/PostTwo";
import PostData from "../../data/blog/PostData.json";
import { getBlogListAction } from "src/actions/blogActions";

const BlogGridTwo = () => {
  const [blogList, setBlogList] = useState([]);
  useEffect(() => {
    getBlogListAction()
      .then((response) => {
        if (response.status) {
          setBlogList(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <SEO title="Blog" />
      <Layout>
        <BreadcrumbOne
          title="Blog"
          rootUrl="/"
          parentUrl="Home"
          currentUrl="Blog"
        />
        <div className="edu-elements-area edu-section-gap bg-color-white">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-12">
                <div className="row g-5">
                  {blogList.map((item) => (
                    <div className="col-lg-6 col-sm-6 col-12" key={item.id}>
                      <PostTwo data={item} />
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div className="col-lg-12 mt--60">
                    {/* <PaginationOne /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default BlogGridTwo;
