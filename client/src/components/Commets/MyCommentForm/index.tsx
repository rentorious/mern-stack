import React from "react";

import { Formik } from "formik";
import { TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { initialValues } from "./constants";
import { commentSchema } from "./schema";
import FlexBetween from "../../FlexBetween";
import { selectState, setPost } from "../../../state";
import { Comment } from "../../../state/types";

interface Props {
  postId: string;
}

const MyCommentForm = (props: Props) => {
  const { postId } = props;

  const { user, baseUrl, token } = useSelector(selectState);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    if (!user) return;

    const { content } = values;

    const {
      firstName,
      lastName,
      email,
      picturePath: userPicturePath,
      _id: userId,
    } = user;

    const commentData = {
      firstName,
      lastName,
      email,
      userPicturePath,
      postId,
      userId,
      content,
    };

    const res = await fetch(`${baseUrl}/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={commentSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <FlexBetween>
            <TextField
              label="content"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.content}
              name="content"
              type="text"
              error={!!touched.content && !!errors.content}
              helperText={touched.content && (errors.content as string)}
            />
            <Button
              type="submit"
              disabled={!values.content}
              // sx={{
              //   color: palette.background.paper,
              //   backgroundColor: palette.primary.main,
              //   borderRadius: "3rem",
              //   "&:hover": {
              //     background: palette.primary.dark,
              //   },
              // }}
            >
              POST
            </Button>
          </FlexBetween>
        </form>
      )}
    </Formik>
  );
};

export default MyCommentForm;
