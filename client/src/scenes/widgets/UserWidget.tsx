import React, { useEffect, useState } from "react";

import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { light } from "@mui/material/styles/createPalette";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { selectState } from "../../state";

interface Props {
  userId: string;
  picturePath?: string;
}

function UserWidget({ userId, picturePath }: Props) {
  const [user, setUser] = useState<any>(null);

  const { palette } = useTheme();
  const dark = palette.secondary.dark;
  const medium = palette.secondary.contrastText;
  const main = palette.secondary.main;

  const navigate = useNavigate();

  const { token, baseUrl } = useSelector(selectState);

  useEffect(() => {
    getUser();

    async function getUser() {
      const res = await fetch(`${baseUrl}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const {
    firstName,
    lastName,
    occupation,
    location,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <UserInfo
        navigate={navigate}
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        light={light}
        dark={dark}
        medium={medium}
        picturePath={picturePath}
        friendNum={friends.length}
      />
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography fontWeight="500" color={main}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Impresions of your posts</Typography>
          <Typography fontWeight="500" color={main}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}

export default UserWidget;

const UserInfo = ({
  navigate,
  userId,
  firstName,
  lastName,
  light,
  dark,
  medium,
  picturePath,
  friendNum,
}) => {
  return (
    <FlexBetween
      gap="0.5rem"
      pb="1.1rem"
      m="1rem"
      onClick={() => navigate(`/profile/${userId}`)}
    >
      <FlexBetween gap="1rem">
        <UserImage image={picturePath} />
        <Box>
          <Typography
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: light,
                cursor: "pointer",
              },
            }}
          >
            {firstName} {lastName}
          </Typography>
          <Typography color={medium}>{friendNum} friends</Typography>
          <ManageAccountsOutlined />
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};
