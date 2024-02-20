import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import MyInput from "./../../components/form/MyInput";
import FilledBtn from "./../../components/buttons/FilledBtn";
import MySelect from "./../../components/form/MySelect";
import { loginValidationSchema } from "./../../utils/validationSchema";

function Login() {
  const [typeText, setTypeText] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      age: "", // Add age field
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // Submit logic
      console.log(values);
    },
  });

  return (
    <div className="h-screen w-full grid place-items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md mx-auto shadow-lg rounded-xl px-5 py-10 space-y-5"
        autoComplete="off"
      >
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

        <MySelect
          name="age"
          label="Age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age ? formik.errors.age : ""}
          options={[10, 20, 30]}
        />

        <FilledBtn type="submit" extra="w-full" iconRight={true} icon="solar:arrow-right-linear" text="Login" />
      </form>
    </div>
  );
}

export default Login;
