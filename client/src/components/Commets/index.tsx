import React from "react";

import { Box, Divider, Typography, useTheme } from "@mui/material";

import { Comment as CommentType } from "../../state/types";
import MyCommentForm from "./MyCommentForm";
import Comment from "components/Comment";

interface Props {
  comments: CommentType[];
  postId: string;
}

function Comments({ comments, postId }: Props) {
  const { palette } = useTheme();
  const main = palette.secondary.main;

  return (
    <Box mt="0.5rem">
      <MyCommentForm postId={postId} />
      {comments.map((comment) => (
        <Comment {...comment} key={comment._id} />
      ))}
      <Divider />
    </Box>
  );
}

export default Comments;
