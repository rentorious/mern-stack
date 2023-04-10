import React from "react";

import { Box, Divider, Typography, useTheme } from "@mui/material";

import { Comment } from "../../state/types";
import MyCommentForm from "./MyCommentForm";

interface Props {
  comments: Comment[];
  postId: string;
}

function Comments({ comments, postId }: Props) {
  const { palette } = useTheme();
  const main = palette.secondary.main;

  return (
    <Box mt="0.5rem">
      <MyCommentForm postId={postId} />
      {comments.map(({ content, _id }) => (
        <Box key={_id}>
          <Divider />
          <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
            {content}
          </Typography>
        </Box>
      ))}
      <Divider />
    </Box>
  );
}

export default Comments;
