import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";
import { replace, useFormik } from "formik";
import MyInput from "./../../components/form/MyInput";
import FilledBtn from "./../../components/buttons/FilledBtn";
import { loginValidationSchema } from "./../../utils/validationSchema";
import logo from "../../assets/logo2.png";
import LoginSvg from "../../assets/login.svg?react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [typeText, setTypeText] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/", { replace: true });
    },
  });

  return (
    <div className="flex h-screen">
      <div className="w-3/5 bg-sky-900 h-full flex items-center justify-center">
        <LoginSvg className="max-h-screen" />
      </div>
      <div className="w-2/5 flex flex-col gap-y-32">
        <div className="p-5 w-full max-w-md mx-auto">
          <img className="w-[180px]" src={logo} />
        </div>

        <div className="p-5 w-full max-w-md mx-auto">
          <h3 className="text-2xl font-bold">Login to your account</h3>
          <p className="text-sm opacity-70 mb-5">Kindly login with right credentials to continue.</p>
          <form onSubmit={formik.handleSubmit} className="w-full space-y-5" autoComplete="off">
            <MyInput
              name="email"
              type="email"
              label="Your Email"
              placeholder="Ex: example@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
            />
            <MyInput
              name="password"
              type={typeText ? "text" : "password"}
              label="Your Password"
              placeholder="Ex: password@1234"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon
                      onClick={() => setTypeText(!typeText)}
                      className="text-xl cursor-pointer"
                      icon={typeText ? "fluent:eye-off-24-regular" : "fluent:eye-24-regular"}
                    />
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
            />

            <FilledBtn type="submit" extra="w-full" iconRight={true} icon="solar:arrow-right-linear" text="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
