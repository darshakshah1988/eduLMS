import React from "react";
import HeaderTwo from "./header/HeaderTwo";
import FooterOne from "./footer/FooterOne";

const Layout = ({ children }) => {
  return (
    <>
      <main className="main-wrapper">
        <HeaderTwo />
        {children}
        <FooterOne />
      </main>
    </>
  );
};
export default Layout;
