import React from "react";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const signupSchema = yup.object({
  firstname: yup.string().required("Tên bắt buộc nhập."),
  lastname: yup.string().required("Họ bắt buộc nhập."),
  email: yup.string().email().required("email bắt buộc nhập."),
  password: yup.string().required("Mật khẩu bắt buộc nhập."),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      email: "",
      password: "",
    },
    validationSchema:signupSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values))
      navigate("/login")
    },
  });
  return (
    <>
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">

                <CustomInput type="text" name="lastname" placeholder="Họ" value={formik.values.lastName} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")}/>
                <div className="error">{formik.touched.lastname && formik.errors.lastname}</div>

                <CustomInput type="text" name="firstname" placeholder="Tên" value={formik.values.firstName} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")} />
                <div className="error">{formik.touched.firstname && formik.errors.firstname}</div>

                <CustomInput type="email" name="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
                <div className="error">{formik.touched.email && formik.errors.email}</div>

                <CustomInput type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("pasword")}/>
                <div className="error">{formik.touched.password && formik.errors.password}</div>

                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
