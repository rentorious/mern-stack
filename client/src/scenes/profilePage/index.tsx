import React, { useEffect, useState } from "react";

import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "../navbar";
import FriendsWidget from "../widgets/FriendsWIdget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";
import { selectState } from "../../state";
import { User } from "../../state/types";

const ProfilePage = () => {
  const [user, setUser] = useState<null | User>(null);

  const { userId = "" } = useParams();

  const { token, baseUrl } = useSelector(selectState);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`${baseUrl}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendsWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          {userId && <PostsWidget userId={userId} isProfile />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
