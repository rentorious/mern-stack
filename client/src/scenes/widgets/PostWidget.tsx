import React, { useState } from "react";

import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Comments from "../../components/Commets";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { selectState, setPost } from "../../state";
import { Post } from "../../state/types";

interface Props
  extends Omit<Post, "_id" | "userId" | "firstName" | "lastName"> {
  postId: string;
  postUserId: string;
  name: string;
}

function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes = new Map<string, boolean>(),
  comments,
}: Props) {
  const [isComments, setIsComments] = useState(false);

  const { palette } = useTheme();
  const main = palette.secondary.main;
  const primary = palette.primary.main;

  const dispatch = useDispatch();
  const { token, baseUrl, user } = useSelector(selectState);
  const loggedInUserId = user?._id || "";

  const isLiked = !!likes[loggedInUserId];
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const res = await fetch(`${baseUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
              <Typography>{comments.length}</Typography>
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && <Comments postId={postId} comments={comments} />}
    </WidgetWrapper>
  );
}

export default PostWidget;
