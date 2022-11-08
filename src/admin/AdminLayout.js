import React from "react";
import "./scss/style.scss";
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

function AdminLayout() {
  return <DefaultLayout />;
}

export default AdminLayout;
