import React from "react";

import { Formik } from "formik";
import { Box, TextField } from "@mui/material";

import { initialValuesLogin } from "../constants";
import { loginSchema } from "../schemas";

interface Props {
  handleBlur: any;
  handleChange: any;
  values: any;
  touched: any;
  errors: any;
}

export default function LoginForm(props: Props) {
  const { handleBlur, handleChange, values, touched, errors } = props;

  return (
    <>
      <TextField
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        type="email"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        label="Password"
        onBlur={handleBlur}
        onChange={handleChange}
        type="password"
        value={values.password}
        name="password"
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        sx={{ gridColumn: "span 4" }}
      />
    </>
  );
}
