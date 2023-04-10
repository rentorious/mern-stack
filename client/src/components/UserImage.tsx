import React from "react";

import { Box } from "@mui/material";

interface Props {
  image?: string;
  size?: string;
}

export default function UserImage({ image, size = "60px" }: Props) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
    </Box>
  );
}
