import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "src/actions/userActions";
import VALIDATION_MESSAGE from "src/constants/validation.constant";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const LoginForm = ({ user, loginAction }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }, { setSubmitting }) => {
      //   getLoaderAction(true);
      const data = { email: email.toLowerCase(), password };
      loginAction(data)
        .then((response) => {
          if (response.status) {
            toast.success(response?.message);
            if (response?.user?.role !== "user") {
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
  React.useEffect(() => {
    if (user?.userInfo?.token) {
      if (user?.userInfo?.role === "user") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }
  }, [user?.userInfo?.token]);
  return (
    <div className="login-form-box">
      <h3 className="mb-30">Login</h3>
      {/* <form className="login-form" noValidate onSubmit={formik.handleSubmit}> */}
      <Form noValidate onSubmit={formik.handleSubmit}>
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

        <div className="comment-form-consent input-box mb--30">
          <input id="checkbox-1" type="checkbox" />
          <label htmlFor="checkbox-1">Remember Me</label>
        </div>
        <button className="rn-btn edu-btn w-100 mb--30" type="submit">
          <span>Login</span>
        </button>
        <div className="input-box">
          <a href="/forgot-password" className="lost-password">
            Lost your password?
          </a>
        </div>
      </Form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state?.userInfo,
});

export default connect(mapStateToProps, { loginAction })(LoginForm);
