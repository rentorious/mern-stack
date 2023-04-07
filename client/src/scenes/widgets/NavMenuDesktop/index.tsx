import React from "react";

import { DarkMode, Help, LightMode, Message } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

import FlexBetween from "../../../components/FlexBetween";
import { setLogout, setMode } from "../../../state";

export default function NavMenuDesktop({ fullName, theme }) {
  const dispatch = useDispatch();

  const dark = theme.palette.secondary.dark;
  const neutralLight = theme.palette.secondary.light;

  return (
    <FlexBetween gap="2rem">
      <IconButton sx={{ fontSize: "25px" }} onClick={() => dispatch(setMode())}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
      <Message sx={{ fontSize: "25px" }} />
      <Help sx={{ fontSize: "25px" }} />
      <FormControl variant="standard">
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
          <MenuItem onClick={() => dispatch(setLogout())}>Log Out </MenuItem>
        </Select>
      </FormControl>
    </FlexBetween>
  );
}
