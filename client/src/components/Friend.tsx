import React from "react";

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectState, setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { User } from "../state/types";

interface Props {
  friendId: string;
  name: string;
  subtitle?: string;
  userPicturePath?: string;
}

function Friend(props: Props) {
  const { friendId, name, subtitle, userPicturePath } = props;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.secondary.main;
  const medium = palette.secondary.contrastText;

  const { baseUrl, token, user } = useSelector(selectState);
  const { _id, friends } = user ?? ({} as User);
  const dispatch = useDispatch();

  const isFriend = friends.find((friend) => friend._id === friendId);

  const navigate = useNavigate();

  const patchFriend = async () => {
    const res = await fetch(`${baseUrl}/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch(setFriends(data));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundCOlor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
}

export default Friend;
