import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./frontend/components/scrolltotop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiClient from "./lib/services/axiosClient";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const AdminLayout = React.lazy(() => import("./admin/AdminLayout"));
const FrontendLayout = React.lazy(() => import("./frontend/Frontend"));

const App = ({ isLoggedIn }) => {
  useEffect(() => {
    const apiClient = new ApiClient();
    apiClient.creatAxiosInstance();
  }, []);
  return (
    <Router>
      <Suspense fallback={loading}>
        <ScrollToTop>
          <Routes>
            <Route path="*" name="User" element={<FrontendLayout />} />
            <Route
              path="/admin/*"
              name="Admin"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ScrollToTop>
      </Suspense>
    </Router>
  );
};
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default connect((state) => ({
  isLoggedIn: Object.keys(state?.userInfo?.userInfo).length > 0,
}))(App);
