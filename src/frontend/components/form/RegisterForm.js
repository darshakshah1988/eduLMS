import { useFormik } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAction } from "src/actions/userActions";
import VALIDATION_MESSAGE from "src/constants/validation.constant";
import * as yup from "yup";

const RegisterForm = ({ registerAction }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    onSubmit: ({ email, password, firstname, lastname }, { setSubmitting }) => {
      //   getLoaderAction(true);
      const data = {
        email: email.toLowerCase(),
        password,
        firstname,
        lastname,
      };
      registerAction(data)
        .then((response) => {
          if (response.status) {
            toast.success(response?.message);
            if (!response?.user?.role !== "user") {
              navigate(`/admin`);
            } else {
              navigate(`/`);
            }
          } else {
            toast.error(response?.message);
          }
        })
        .catch(() => {
          toast.error("Something wrong! please try again");
        })
        .then(() => {
          setSubmitting(false);
        });
    },
    validationSchema: yup.object({
      firstname: yup.string().required("First name is required"),
      lastname: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email(VALIDATION_MESSAGE.email.invalid)
        .required(VALIDATION_MESSAGE.email.require),
      password: yup
        .string()
        .trim()
        .required(VALIDATION_MESSAGE.password.require),
    }),
  });
  return (
    <div className="login-form-box">
      <h3 className="mb-30">Register</h3>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="input-box mb--30" controlId="firstname">
          <Form.Control
            type="text"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.firstname}
            placeholder="First name"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.firstname}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="input-box mb--30" controlId="lastname">
          <Form.Control
            type="text"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.lastname}
            placeholder="Last name"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.lastname}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="input-box mb--30" controlId="email">
          <Form.Control
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.email}
            placeholder="Email Address"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="input-box mb--30" controlId="password">
          {/* <Form.Label>First name</Form.Label> */}
          <Form.Control
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.password}
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <button className="rn-btn edu-btn w-100 mb--30" type="submit">
          <span>Register</span>
        </button>
        <div className="input-box">
          <input id="checkbox-2" type="checkbox" />
          <label htmlFor="checkbox-2">
            I read & agree the terms & conditions.
          </label>
        </div>
      </Form>
    </div>
  );
};

export default connect(null, { registerAction })(RegisterForm);
