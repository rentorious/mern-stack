import React from "react";

import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import { selectState } from "../state";

interface Props {
  image?: string;
  size?: string;
}

export default function UserImage({ image, size = "60px" }: Props) {
  const baseUrl = useSelector(selectState);

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${baseUrl}/assets/${image}`}
      />
    </Box>
  );
}
