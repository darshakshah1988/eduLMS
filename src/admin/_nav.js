import React from "react";
import CIcon from "@coreui/icons-react";
import { cilSpeedometer, cilList } from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    role: ["admin", "mentor"],
  },
  {
    component: CNavItem,
    name: "Courses",
    to: "/admin/courses",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    role: ["admin", "mentor"],
  },
  {
    component: CNavItem,
    name: "Blog",
    to: "/admin/blogs",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    role: ["admin"],
  },
];
export default _nav;
