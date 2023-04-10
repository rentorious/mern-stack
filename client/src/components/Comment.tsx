import React from "react";

import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import { Comment as CommentType } from "state/types";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useSelector } from "react-redux";
import { selectState } from "state";
import { useNavigate } from "react-router-dom";

interface Props extends CommentType {}

const Comment = (props: Props) => {
  const {
    _id,
    userId,
    postId,
    content,
    firstName,
    lastName,
    email,
    likes = new Map<string, boolean>(),
    userPicturePath,
  } = props;

  const { user } = useSelector(selectState);
  const loggedInUserId = user?._id ?? "";

  const isLiked = !!likes[loggedInUserId];
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const light = palette.primary.light;

  const navigate = useNavigate();

  return (
    <FlexBetween p="0.5rem">
      <UserImage image={userPicturePath} size="40px" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        flexGrow={1}
        pl="0.5rem"
      >
        <FlexBetween
          gap="0.25rem"
          onClick={() => {
            navigate(`/profile/${userId}`);
            navigate(0);
          }}
          sx={{
            "&:hover": {
              color: light,
              cursor: "pointer",
            },
          }}
        >
          <Typography fontWeight="600">{firstName} </Typography>
          <Typography fontWeight="400"> {email}</Typography>
        </FlexBetween>
        <Typography>{content}</Typography>
      </Box>
      <FlexBetween gap="0.3rem">
        <IconButton onClick={() => {}}>
          {isLiked ? (
            <FavoriteOutlined sx={{ color: primary }} />
          ) : (
            <FavoriteBorderOutlined />
          )}
        </IconButton>
        <Typography>{likeCount}</Typography>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Comment;
