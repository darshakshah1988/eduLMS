/* eslint-disable no-script-url */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getCourseDetailsAction } from "src/actions/courseActions";
import { toast } from "react-toastify";
import CurriculumTabContent from "./component/Curriculum";

const EditCourse = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(1);

  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      title: "",
      coverImage: "",
      overview: "",
      skill_level: "",
      language: "",
      pass_percentage: "",
    },
    onSubmit: (values) => {
      const data = new FormData();
      data.append("title", values.title);
      data.append("overview", values.overview);
      data.append("skill_level", values.skill_level);
      data.append("language", values.language);
      data.append("pass_percentage", values.pass_percentage);
      data.append("coverImage", values.coverImage);
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, "Title too short!")
        .max(50, "Title too long!")
        .required("Course title is required"),
      overview: Yup.string().required("Course overview is required"),
      skill_level: Yup.string().required("Skill level is required"),
      language: Yup.string().required("Language is required"),
      pass_percentage: Yup.number()
        .integer("Percentage should be between 0 and 100")
        .min(35, "Pass percentage minimum 35")
        .max(90, "Pass percentage maximum 90")
        .required("Pass percentage is required"),
    }),
  });
  useEffect(() => {
    getCourseDetailsAction(id)
      .then((response) => {
        if (response.status) {
          formik.setValues(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <CCard className="mb-4">
      <CCardHeader>Edit course</CCardHeader>
      <CCardBody>
        <CNav variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              href="javascript:void(0)"
              active={activeKey === 1}
              onClick={() => setActiveKey(1)}
            >
              Overview
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="javascript:void(0)"
              active={activeKey === 2}
              onClick={() => setActiveKey(2)}
            >
              Curriculum
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="home-tab"
            visible={activeKey === 1}
          >
            <div className="pt-3 ps-2">
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="title" className="form-label">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      readOnly
                      disabled
                    />
                    {formik.errors.title && formik.touched.title && (
                      <div className="invalid-feedback">
                        {formik.errors.title}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="skill" className="form-label">
                      Skill Level *
                    </label>
                    <select
                      className="form-select"
                      id="skill"
                      value={formik.values.skill_level}
                      onChange={formik.handleChange}
                      name="skill_level"
                    >
                      <option disabled value="">
                        Choose skill level
                      </option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    {formik.errors.skill_level &&
                      formik.touched.skill_level && (
                        <div className="invalid-feedback">
                          {formik.errors.skill_level}
                        </div>
                      )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="lang" className="form-label">
                      Language *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lang"
                      name="language"
                      value={formik.values.language}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.language && formik.touched.language && (
                      <div className="invalid-feedback">
                        {formik.errors.language}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="pass_percentage" className="form-label">
                      Pass Percentage *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pass_percentage"
                      name="pass_percentage"
                      value={formik.values.pass_percentage}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.pass_percentage &&
                      formik.touched.pass_percentage && (
                        <div className="invalid-feedback">
                          {formik.errors.pass_percentage}
                        </div>
                      )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <label htmlFor="overview" className="form-label">
                      Overview *
                    </label>

                    <CKEditor
                      editor={ClassicEditor}
                      data={formik.values.overview}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        formik.setFieldValue("overview", data);
                      }}
                    />
                    {formik.errors.overview && formik.touched.overview && (
                      <div className="invalid-feedback">
                        {formik.errors.overview}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-2">
                    <button className="btn btn-primary" type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="profile-tab"
            visible={activeKey === 2}
          >
            <div className="pt-3 ps-2">
              <CurriculumTabContent courseId={id} />
            </div>
          </CTabPane>
        </CTabContent>
      </CCardBody>
    </CCard>
  );
};

export default EditCourse;
