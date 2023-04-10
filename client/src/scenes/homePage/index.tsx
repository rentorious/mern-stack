import React from "react";

import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import NavBar from "../navbar";
import PostsWidget from "../widgets/PostsWidget";
import AdWidget from "../widgets/AdWidget";
import FriendsWidget from "../widgets/FriendsWIdget";
import { selectState } from "../../state";
import { User } from "../../state/types";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { user } = useSelector(selectState);
  const { _id, picturePath } = user ?? ({} as User);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        component="div"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdWidget />
            <Box m="2rem 0"></Box>
            <FriendsWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default HomePage;
