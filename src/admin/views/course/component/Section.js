import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCourseSection } from "src/actions/courseActions";
import * as Yup from "yup";
import LectureComponent from "./Lecture";

const CurriculumSectionComponent = ({ data, isNew, loadData, order }) => {
  const [lectures, setLectures] = useState(isNew ? [] : [...data?.lectures]);
  const [isAddEnable, setIsAddEnable] = useState(false);
  useEffect(() => {
    setLectures(isNew ? [] : [...data?.lectures]);
    setIsAddEnable(false);
  }, [data, isNew]);

  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      title: "",
      details: "",
    },
    onSubmit: ({ title, details }) => {
      const fdata = { title, details, order, courseId: id };

      createCourseSection(fdata).then((response) => {
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
  const addLecture = () => {
    setLectures((items) => [...items, ""]);
    setIsAddEnable(true);
  };
  const cancelAdding = (isRemove = false) => {
    setIsAddEnable(false);
    if (isRemove) {
      const items = [...lectures];
      items.pop();
      if (items.length === 0) {
        setLectures([]);
      } else {
        setLectures(items);
      }
    }
  };
  if (isNew) {
    return (
      <section className="chapter-section new-section">
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="row">
            <div className="col-md-6 mb-2">
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
          <div className="row">
            <div className="col-md-6 mb-2">
              <label htmlFor="details" className="form-label">
                Section Details *
              </label>
              <textarea
                className="form-control"
                id="details"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                rows={3}
              />
            </div>
          </div>
          <div className="action">
            <button type="submit" className="btn btn-primary right">
              Add Section
            </button>
          </div>
        </form>
      </section>
    );
  }
  return (
    <section className="chapter-section">
      <div className="section-head">
        <h6 className="section-heading">
          <b>Section-{data.order + 1}:</b> {data.title}{" "}
        </h6>
      </div>
      <p>{data.details}</p>
      <div className="lectures">
        {lectures.map((lecture, i) => (
          <LectureComponent
            key={`lec-${i}`}
            lecture={lecture}
            sectionId={data.id}
            isNew={!lecture?.id}
            order={i}
            loadData={loadData}
            cancelAdding={cancelAdding}
          />
        ))}
      </div>
      {!isAddEnable && (
        <button
          type="button"
          className="btn btn-outline-primary mt-2"
          onClick={() => addLecture()}
        >
          Add Lecture
        </button>
      )}
    </section>
  );
};

export default CurriculumSectionComponent;
