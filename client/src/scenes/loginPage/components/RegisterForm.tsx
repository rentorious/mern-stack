import React from "react";

import { EditOutlined } from "@mui/icons-material";
import { Box, TextField, Typography, useTheme } from "@mui/material";

import Dropzone from "react-dropzone";
import FlexBetween from "../../../components/FlexBetween";

interface Props {
  handleBlur: any;
  handleChange: any;
  values: any;
  touched: any;
  errors: any;
  setFieldValue: any;
}

export default function RegisterForm(props: Props) {
  const { setFieldValue, handleBlur, handleChange, values, touched, errors } =
    props;

  const { palette } = useTheme();

  return (
    <>
      <TextField
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name="firstName"
        error={!!touched.firstName && !!errors.firstName}
        helperText={touched.firstName ? (errors.firstName as string) : ""}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name="lastName"
        error={!!touched.lastName && !!errors.lastName}
        helperText={touched.lastName && (errors.lastName as string)}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        label="Location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location}
        name="location"
        error={!!touched.location && !!errors.location}
        helperText={touched.location && (errors.location as string)}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        label="Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.occupation}
        name="occupation"
        error={!!touched.occupation && !!errors.occupation}
        helperText={touched.occupation && (errors.occupation as string)}
        sx={{ gridColumn: "span 4" }}
      />
      <Box
        gridColumn="span 4"
        border={`1px solid ${palette.secondary.contrastText}`}
        borderRadius="5px"
        padding="1rem"
      >
        <Dropzone
          accept={{ "image/*": [".jpeg", ".jpeg", ".png"] }}
          multiple={false}
          onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`2px dashed ${palette.primary.main}`}
              p="1rem"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!values.picture ? (
                <p>Add picture here</p>
              ) : (
                <FlexBetween>
                  <Typography>{(values.picture as File).name}</Typography>
                  <EditOutlined />
                </FlexBetween>
              )}
            </Box>
          )}
        </Dropzone>
      </Box>
    </>
  );
}
