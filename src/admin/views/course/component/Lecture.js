import { useFormik } from "formik";
import { useState } from "react";
import {
  createLectureAction,
  uploadVideoAction,
} from "src/actions/courseActions";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { CProgress, CProgressBar } from "@coreui/react";
import { toast } from "react-toastify";

const LectureComponent = (props) => {
  const { lecture, isNew, sectionId, order, loadData, cancelAdding } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [dropRejectError, setDropRejectError] = useState([]);
  const [selectFile, setSelectFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: ({ title }) => {
      const fdata = { title, order, sectionId, status: "active" };

      createLectureAction(fdata).then((response) => {
        if (response.status) {
          loadData();
        }
      });
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .min(3, "Title too short!")
        .max(50, "Title too long!")
        .required("This is field should not be empty"),
    }),
  });
  const reportUpload = (files) => {
    const file = files[0];
    setSelectFile(file);
    const data = new FormData();
    data.append("video", file);

    uploadVideoAction(lecture.id, data, {
      onUploadProgress: (event) => {
        const percentage = Math.round((100 * event.loaded) / event.total);
        setProgress(percentage);
      },
    })
      .then((response) => {
        if (response.status) {
          loadData();
          toast.success(response?.message);
          cancelAdding();
        } else {
          toast.error(response?.message);
        }
      })
      .catch(() => {
        toast.error("Something wrong! please try again");
      })
      .finally(() => {
        setSelectFile(null);
        setProgress(0);
      });
  };
  console.log(selectFile);
  if (isNew) {
    return (
      <div className="lecture-section new-lecture">
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-12 mb-2">
              <label htmlFor="title" className="form-label">
                Section Title *
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
          <div className="action">
            <button
              type="button"
              className="btn "
              onClick={() => cancelAdding(true)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary right">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="lecture-section">
      <div className="lecture-head">
        <h6 className="lecture-heading">
          <b>Lecture-{lecture.order + 1}:</b> {lecture.title}{" "}
        </h6>
        <div className="btn-action">
          <button
            className={`btn-down ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen((i) => !i)}
          >
            <i class="fa fa-regular fa-chevron-down"></i>
          </button>
          <button className="btn-edit">
            <i class="fa fa-light fa-pen"></i>
          </button>
          <button className="bt-delete">
            <i class="fa fa-regular fa-trash"></i>
          </button>
        </div>
      </div>
      <div className={`lecture-body ${isOpen ? "open" : ""}`}>
        {lecture?.video ? (
          <div className="content">
            <video width="130" height="90">
              <source
                src={`${process.env.REACT_APP_API_BASE_URL}/static/videos/${lecture?.video}`}
                type="video/mp4"
              />
              <source
                src={`${process.env.REACT_APP_API_BASE_URL}/static/videos/${lecture?.video}`}
                type="video/ogg"
              />
              <source
                src={`${process.env.REACT_APP_API_BASE_URL}/static/videos/${lecture?.video}`}
                type="video/webm"
              />
              <object
                data={`${process.env.REACT_APP_API_BASE_URL}/static/videos/${lecture?.video}`}
                width="160"
                height="90"
              >
                <embed
                  src={`${process.env.REACT_APP_API_BASE_URL}/static/videos/${lecture?.video}`}
                  width="160"
                  height="90"
                />
              </object>
            </video>
            <div className="title">
              <span className="file-name">{lecture?.video}</span>
              <span className="file-size"></span>
            </div>
          </div>
        ) : !selectFile ? (
          <>
            <Dropzone
              accept={{ "video/*": [] }}
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
                    <button class="btn-text">Upload Video</button>
                  </div>
                </div>
              )}
            </Dropzone>
            {dropRejectError.map((file) => (
              <p className="invalid-feedback" key={file.file.name}>
                {file.file.name} is not valid file type
              </p>
            ))}
          </>
        ) : (
          <div className="upload-progress">
            <div className="left">
              <span className="file-name">{selectFile.name}</span>
              <span className="file-size">
                {(selectFile.size / (1024 * 1024)).toFixed(2)} Mb
              </span>
            </div>
            <div className="right">
              <CProgress className="mb-3">
                <CProgressBar value={progress}>{progress}%</CProgressBar>
              </CProgress>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LectureComponent;
