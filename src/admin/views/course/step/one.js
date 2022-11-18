import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createCourseStepOne } from "src/actions/courseActions";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { useState } from "react";
import {
  uploadImageAction,
  uploadVideoAction,
} from "src/actions/generalActions";

const CourseStepOne = () => {
  const navigate = useNavigate();
  const [videoDropRejectError, setVideoDropRejectError] = useState([]);
  const [selectVideoFile, setSelectVideoFile] = useState(null);

  const [coverDropRejectError, setCoverDropRejectError] = useState([]);
  const [selectCoverFile, setSelectCoverFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      coverImage: "",
      overview: "",
      skill_level: "",
      language: "",
      pass_percentage: "",
      previewVideo: "",
    },
    onSubmit: (values) => {
      const data = new FormData();
      data.append("title", values.title);
      data.append("overview", values.overview);
      data.append("skill_level", values.skill_level);
      data.append("language", values.language);
      data.append("pass_percentage", values.pass_percentage);
      data.append("cover_image", values.coverImage);
      data.append("preview_video", values.previewVideo);
      createCourseStepOne(data)
        .then((response) => {
          console.log(response);
          if (response.status) {
            navigate(`/admin/edit-course/${response.data.id}`);
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
        .required("Course title is required"),
      overview: Yup.string().required("Course overview is required"),
      skill_level: Yup.string().required("Skill level is required"),
      language: Yup.string().required("Language is required"),
      pass_percentage: Yup.number()
        .integer("Percentage should be between 0 and 100")
        .min(35, "Pass percentage minimum 35")
        .max(90, "Pass percentage maximum 90")
        .required("Pass percentage is required"),
      coverImage: Yup.string().required("Cover image is required"),
      previewVideo: Yup.string().required("Preview video is required"),
    }),
  });
  const onSelectVideo = (files) => {
    const file = files[0];
    setSelectVideoFile(file);
    const data = new FormData();
    data.append("video", file);
    uploadVideoAction(data).then((response) => {
      formik.setFieldValue("previewVideo", response.data);
    });
  };
  const onSelectCoverImage = (files) => {
    const file = files[0];
    setSelectCoverFile(file);
    const data = new FormData();
    data.append("image", file);
    uploadImageAction(data).then((response) => {
      formik.setFieldValue("coverImage", response.data);
    });
  };
  return (
    <CCard className="mb-4">
      <CCardHeader>Create a new course</CCardHeader>
      <CCardBody>
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
              />
              {formik.errors.title && formik.touched.title && (
                <div className="invalid-feedback">{formik.errors.title}</div>
              )}
            </div>
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
              {formik.errors.skill_level && formik.touched.skill_level && (
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
                <div className="invalid-feedback">{formik.errors.language}</div>
              )}
            </div>
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
            <div className="col-md-6 mb-2">
              <label htmlFor="lang" className="form-label">
                Preview Video *
              </label>
              {!selectVideoFile ? (
                <>
                  <Dropzone
                    accept={{ "video/mp4": [] }}
                    onDrop={(acceptedFiles) => onSelectVideo(acceptedFiles)}
                    onDropRejected={(fileRejections) =>
                      setVideoDropRejectError(fileRejections)
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
                  {videoDropRejectError.map((file) => (
                    <p className="invalid-feedback" key={file.file.name}>
                      {file.file.name} is not valid file type
                    </p>
                  ))}
                </>
              ) : (
                <div className="drop-zone">
                  <div className="container">
                    <span className="file-name">{selectVideoFile.name}</span>
                    <span className="file-size">
                      <b>
                        {(selectVideoFile.size / (1024 * 1024)).toFixed(2)} Mb
                      </b>
                    </span>
                  </div>
                </div>
              )}
              {formik.errors.previewVideo && formik.touched.previewVideo && (
                <div className="invalid-feedback">
                  {formik.errors.previewVideo}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-2">
              <label htmlFor="lang" className="form-label">
                Cover Image *
              </label>
              {!selectCoverFile ? (
                <>
                  <Dropzone
                    accept={{ "image/*": [] }}
                    onDrop={(acceptedFiles) =>
                      onSelectCoverImage(acceptedFiles)
                    }
                    onDropRejected={(fileRejections) =>
                      setCoverDropRejectError(fileRejections)
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
                  {coverDropRejectError.map((file) => (
                    <p className="invalid-feedback" key={file.file.name}>
                      {file.file.name} is not valid file type
                    </p>
                  ))}
                </>
              ) : (
                <div className="drop-zone">
                  <div className="container">
                    <span className="file-name">{selectCoverFile.name}</span>
                    <span className="file-size">
                      <b>
                        {(selectCoverFile.size / (1024 * 1024)).toFixed(2)} Mb
                      </b>
                    </span>
                  </div>
                </div>
              )}
              {formik.errors.coverImage && formik.touched.coverImage && (
                <div className="invalid-feedback">
                  {formik.errors.coverImage}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mb-2">
              <label htmlFor="overview" className="form-label">
                Overview
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
                <div className="invalid-feedback">{formik.errors.overview}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-2">
              <button className="btn btn-primary" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
      </CCardBody>
    </CCard>
  );
};

export default CourseStepOne;
