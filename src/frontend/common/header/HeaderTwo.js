import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import HeaderSticky from "./HeaderSticky";
import ResponsiveMenu from "./ResponsiveMenu";
import { connect } from "react-redux";

const HeaderTwo = ({
  user,
  styles,
  disableSticky,
  searchDisable,
  buttonStyle,
}) => {
  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [searchPopup, setSearchPopup] = useState(false);

  const navigate = useNavigate();
  const onCanvasHandler = () => {
    setOffcanvasShow((prevState) => !prevState);
  };

  const onSearchHandler = () => {
    setSearchPopup((prevState) => !prevState);
  };

  if (searchPopup) {
    document.body.classList.add("search-popup-active");
  } else {
    document.body.classList.remove("search-popup-active");
  }

  const sticky = HeaderSticky(200);
  const classes = `header-default ${sticky ? "sticky" : ""}`;
  const stickyStatus = disableSticky ? "" : " header-sticky";
  return (
    <>
      <header
        className={`edu-header header-style-2 ${stickyStatus} ${styles || ""} ${
          classes || ""
        }`}
      >
        <div className="row align-items-center">
          <div className="col-lg-4 col-xl-3 col-md-6 col-6">
            <div className="logo">
              <Link to={process.env.PUBLIC_URL + "/"}>
                <img
                  className="logo-light"
                  src="/images/logo/idevelope.png"
                  alt="Main Logo"
                />
              </Link>
            </div>
          </div>

          <div className="col-lg-6 d-none d-xl-block">
            <nav className="mainmenu-nav d-none d-lg-block">
              <Nav />
            </nav>
          </div>

          <div className="col-lg-8 col-xl-3 col-md-6 col-6">
            <div className="header-right d-flex justify-content-end">
              <div className="header-menu-bar">
                {!searchDisable && (
                  <div className="quote-icon quote-search">
                    <button
                      className="white-box-icon search-trigger header-search"
                      onClick={onSearchHandler}
                    >
                      <i className="ri-search-line"></i>
                    </button>
                  </div>
                )}
                <div className="quote-icon quote-user d-none d-md-block ml--15 ml_sm--5">
                  <Link
                    className={`edu-btn btn-medium left-icon header-button ${
                      buttonStyle || ""
                    }`}
                    to={
                      user?.userInfo?.token
                        ? process.env.PUBLIC_URL + "/profile"
                        : process.env.PUBLIC_URL + "/login"
                    }
                  >
                    <i className="ri-user-line"></i>
                    {user?.userInfo?.token
                      ? user?.userInfo?.firstname +
                        " " +
                        user?.userInfo?.lastname
                      : "Login / Register"}
                  </Link>
                </div>
                <div className="quote-icon quote-user d-block d-md-none ml--15 ml_sm--5">
                  <Link
                    to={process.env.PUBLIC_URL + "/login"}
                    className="white-box-icon"
                    href="#"
                  >
                    <i className="ri-user-line"></i>
                  </Link>
                </div>
              </div>
              <div className="mobile-menu-bar ml--15 ml_sm--5 d-block d-xl-none">
                <div className="hamberger">
                  <button
                    className="white-box-icon hamberger-button header-menu"
                    onClick={onCanvasHandler}
                  >
                    <i className="ri-menu-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <ResponsiveMenu
        show={offcanvasShow}
        onClose={onCanvasHandler}
        showSearch={searchPopup}
        onSearch={onSearchHandler}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state?.userInfo,
});

export default connect(mapStateToProps)(HeaderTwo);
