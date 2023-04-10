import React, { useState } from "react";

import {
  Close,
  DarkMode,
  Help,
  LightMode,
  Menu,
  Message,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";

import FlexBetween from "../../../components/FlexBetween";
import { setLogout, setMode } from "../../../state";

interface Props {
  fullName: string;
}

export default function NavMenuMobile({ fullName }: Props) {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const { palette } = useTheme();
  const background = palette.background.default;
  const dark = palette.secondary.dark;
  const neutralLight = palette.secondary.light;

  const dispatch = useDispatch();

  return (
    <>
      <IconButton onClick={() => setIsMobileMenuToggled((val) => !val)}>
        <Menu />
      </IconButton>
      {isMobileMenuToggled && (
        <Box
          position="fixed"
          height="100%"
          right="0"
          bottom="0"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          bgcolor={background}
          component="div"
        >
          <>
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton onClick={() => setIsMobileMenuToggled((val) => !val)}>
                <Close />
              </IconButton>
            </Box>
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                sx={{ fontSize: "25px" }}
                onClick={() => dispatch(setMode())}
              >
                {palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" component="div">
                <Select
                  sx={{
                    borderRadius: "0.25rem",
                    padding: "0.25rem 1rem",
                    backgroundColor: neutralLight,
                    width: "150px",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName} </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out{" "}
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </>
        </Box>
      )}
    </>
  );
}
