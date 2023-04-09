import React from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  email: yup.string().email().required("email bắt buộc nhập."),
  password: yup.string().required("Mật khẩu bắt buộc nhập."),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values))
      navigate("/")
    },
  });
  return (
    <>
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
              <CustomInput type="email" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
                <div className="error">{formik.touched.email && formik.errors.email}</div>

                <CustomInput type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("pasword")}/>
                <div className="error">{formik.touched.password && formik.errors.password}</div>

                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button className="button border-0" type="submit">
                    Login
                  </button>
                  <Link to="/signup" className="button signup">
                    SignUp
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
