import {
  CCard,
  CCardBody,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, FormCheck } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changeCourserStatusAction,
  getCourseListForAdminAction,
} from "src/actions/courseActions";

const Course = () => {
  const [list, setList] = useState([]);
  const { userInfo } = useSelector((state) => state?.userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    getCourseListForAdminAction().then((response) => {
      if (response.status) {
        setList(response.data);
      }
    });
  }, []);
  return (
    <CCard className="mb-4">
      <CCardBody>
        <div className="d-grid d-md-flex justify-content-between mb-4">
          <h4>Course List</h4>
          <Button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              navigate("/admin/create-course/step/1");
            }}
          >
            Create Course
          </Button>
        </div>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col">Skill Level</CTableHeaderCell>
              <CTableHeaderCell scope="col">status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list.map((item, index) => (
              <CourseRow
                item={item}
                key={index}
                index={index}
                userInfo={userInfo}
                navigate={navigate}
              />
            ))}
          </CTableBody>
        </CTable>
        {/* <CPagination align="end" aria-label="Page navigation ">
          <CPaginationItem aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          <CPaginationItem>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination> */}
      </CCardBody>
    </CCard>
  );
};
function CourseRow({ item, index, userInfo, navigate }) {
  const [active, setActive] = useState(item.status === "active");
  const onChangeToggle = () => {
    const data = {
      status: !active ? "active" : "inactive",
    };
    changeCourserStatusAction(item.id, data)
      .then((response) => {
        if (response.status) {
          toast.success(response?.message);
          setActive(!active);
        } else {
          toast.error(response?.message);
        }
      })
      .catch(() => {
        toast.error("Something wrong!, Please try again");
      });
  };
  console.log(active);
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableDataCell>{item.title}</CTableDataCell>
      <CTableDataCell>{item.skill_level}</CTableDataCell>
      <CTableDataCell>
        {userInfo.role !== "admin" ? (
          item.status
        ) : (
          <FormCheck
            type="switch"
            checked={active}
            onChange={() => onChangeToggle()}
            label="Enable"
          />
        )}
      </CTableDataCell>
      <CTableDataCell>
        {moment(item.createdAt).format("DD-MM-YYYY")}
      </CTableDataCell>
      <CTableDataCell>
        <Button
          className="btn btn-primary btn-sm me-2"
          type="button"
          onClick={() => navigate(`/admin/edit-course/${item.id}`)}
        >
          Edit
        </Button>
        <Button className="btn btn-danger btn-sm" type="button">
          Delete
        </Button>
      </CTableDataCell>
    </CTableRow>
  );
}
export default Course;
