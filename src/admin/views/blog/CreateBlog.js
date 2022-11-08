import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { createBlogAction } from "src/actions/blogActions";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectFile] = useState(null);
  const [dropRejectError, setDropRejectError] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      details: "",
      readingTime: "",
      categories: "",
      image: "",
    },
    onSubmit: (values) => {
      const data = new FormData();
      data.append("title", values.title);
      data.append("details", values.details);
      data.append("categories", values.categories);
      data.append("readingTime", values.readingTime);
      if (values.image === "yes") {
        data.append("image", selectedFile);
      }
      createBlogAction(data)
        .then((response) => {
          console.log(response);
          if (response.status) {
            navigate(`/admin/blog`);
          } else {
            toast.error(response?.message);
          }
        })
        .catch(() => {
          toast.error("Something wrong! please try again");
        });
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, "Title too short!")
        .max(50, "Title too long!")
        .required("Blog title is required"),
      details: Yup.string().required("Blog overview is required"),
      image: Yup.string().required("Blog Image is required"),
      categories: Yup.string().required("Categories is required"),
      readingTime: Yup.string().required("Reading time is required"),
    }),
  });
  const reportUpload = (files) => {
    const file = files[0];
    setSelectFile(file);
    formik.setFieldValue("image", "yes");
  };
  return (
    <CCard className="mb-4">
      <CCardHeader>Create a new course</CCardHeader>
      <CCardBody>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.errors.title && formik.touched.title && (
                <div className="invalid-feedback">{formik.errors.title}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="categories" className="form-label">
                Category *
              </label>
              <select
                className="form-select"
                id="categories"
                value={formik.values.categories}
                onChange={formik.handleChange}
                name="categories"
              >
                <option disabled value="">
                  Choose category
                </option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Online Learning">Online Learning</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
              {formik.errors.categories && formik.touched.categories && (
                <div className="invalid-feedback">
                  {formik.errors.categories}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="readingTime" className="form-label">
                Reading Time *
              </label>
              <input
                type="text"
                className="form-control"
                id="readingTime"
                name="readingTime"
                value={formik.values.readingTime}
                onChange={formik.handleChange}
              />
              {formik.errors.readingTime && formik.touched.readingTime && (
                <div className="invalid-feedback">
                  {formik.errors.readingTime}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="readingTime" className="form-label">
                Image *
              </label>
              {/* <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
              /> */}
              <Dropzone
                accept={{ "image/*": [] }}
                onDrop={(acceptedFiles) => reportUpload(acceptedFiles)}
                onDropRejected={(fileRejections) =>
                  setDropRejectError(fileRejections)
                }
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="drop-zone">
                    <div className="container" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <span>Drag & Drop</span>
                      <b>or</b>
                      <button className="btn-text">Upload Video</button>
                    </div>
                  </div>
                )}
              </Dropzone>
              {dropRejectError.map((file) => (
                <p className="invalid-feedback" key={file.file.name}>
                  {file.file.name} is not valid file type
                </p>
              ))}
              {formik.errors.image && formik.touched.image && (
                <div className="invalid-feedback">{formik.errors.image}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-2">
              <label htmlFor="details" className="form-label">
                details
              </label>

              <CKEditor
                editor={ClassicEditor}
                data={formik.values.details}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  formik.setFieldValue("details", data);
                }}
              />
              {formik.errors.details && formik.touched.details && (
                <div className="invalid-feedback">{formik.errors.details}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-2">
              <button className="btn btn-primary" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
      </CCardBody>
    </CCard>
  );
};

export default CreateBlog;
