import React, { useState } from "react";

import { Formik } from "formik";
import { InputBase, Button, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import FlexBetween from "../../FlexBetween";
import { selectState, setPost } from "../../../state";
import { Comment, User } from "../../../state/types";
import UserImage from "components/UserImage";

interface Props {
  postId: string;
}

const MyCommentForm = (props: Props) => {
  const { postId } = props;

  const [content, setContent] = useState("");

  const { user, baseUrl, token } = useSelector(selectState);
  const { picturePath } = user ?? ({} as User);
  const dispatch = useDispatch();

  const { palette } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

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
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FlexBetween p="0.5rem">
        <UserImage image={picturePath} size="40px" />
        <InputBase
          name="content"
          placeholder="Add your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ fontSize: "1.25rem", pl: "0.5rem", flexGrow: 1 }}
        />
        <Button
          type="submit"
          disabled={!content}
          size="small"
          sx={{
            color: palette.background.paper,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:hover": {
              background: palette.primary.dark,
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </form>
  );
};

export default MyCommentForm;
