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
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getBlogListForAdminAction } from "src/actions/blogActions";

const Blog = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getBlogListForAdminAction().then((response) => {
      if (response.status) {
        setList(response.data);
      }
    });
  }, []);
  return (
    <CCard className="mb-4">
      <CCardBody>
        <div className="d-grid d-md-flex justify-content-between mb-4">
          <h4>Blog List</h4>
          <Button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              navigate("/admin/blog/create-blog");
            }}
          >
            Create Blog
          </Button>
        </div>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Skill Level</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Created Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {list.map((item, index) => (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.title}</CTableDataCell>
                {/* <CTableDataCell>{item.skill_level}</CTableDataCell> */}
                <CTableDataCell>{item.status}</CTableDataCell>
                <CTableDataCell>
                  {moment(item.createdAt).format("DD-MM-YYYY")}
                </CTableDataCell>
                <CTableDataCell>
                  <Button
                    className="btn btn-primary btn-sm me-2"
                    type="button"
                    onClick={() => navigate(`/admin/edit-blog/${item.id}`)}
                  >
                    Edit
                  </Button>
                  <Button className="btn btn-danger btn-sm" type="button">
                    Delete
                  </Button>
                </CTableDataCell>
              </CTableRow>
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

export default Blog;
