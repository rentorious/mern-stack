import React from "react";

import { Search } from "@mui/icons-material";
import {
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FlexBetween from "../../components/FlexBetween";
import NavMenuDesktop from "../widgets/NavMenuDesktop";
import NavMenuMobile from "../widgets/NavMenuMobile";
import { selectState } from "../../state";

const NavBar = () => {
  const navigate = useNavigate();

  const { user } = useSelector(selectState);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.secondary.light;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.paper;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" bgcolor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          SociaLite
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            bgcolor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop Nav */}
      {isNonMobileScreens ? (
        <NavMenuDesktop theme={theme} fullName={fullName} />
      ) : (
        <NavMenuMobile theme={theme} fullName={fullName} />
      )}
    </FlexBetween>
  );
};
export default NavBar;
