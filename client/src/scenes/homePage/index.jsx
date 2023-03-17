import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

import UserWidget from "../widgets/UserWidget";
import NavBar from "../navbar";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        pading="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};
export default HomePage;
