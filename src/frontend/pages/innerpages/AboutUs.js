import React from "react";
import SEO from "../../common/SEO";
import HeaderTwo from "../../common/header/HeaderTwo";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import AboutSeven from "../../components/about/AboutSeven";
import AboutUsOneService from "../../components/about-us-one/AboutUsOneService";
import AboutSix from "../../components/about/AboutSix";
import AboutOne from "../../components/about/AboutThree";
import AboutUsOneTeam from "../../components/about-us-one/AboutUsOneTeam";
import HomeTwoTestimonial from "../../components/home/HomeTwoTestimonial";
import FooterTwo from "../../common/footer/FooterTwo";

const AboutUsOne = () => {
  return (
    <>
      <SEO title="About Us 1" />

      <HeaderTwo />

      <BreadcrumbOne
        title="About Us-1"
        rootUrl="/"
        parentUrl="Home"
        currentUrl="About Us"
      />

      <AboutSeven />

      <AboutUsOneService />

      <AboutSix />

      <AboutOne />

      <AboutUsOneTeam />

      <HomeTwoTestimonial />

      <FooterTwo />
    </>
  );
};

export default AboutUsOne;
