import React from "react";

import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.background.paper}
        p="1rem 6%"
        textAlign="center"
        component="div"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SociaLite
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome the SocioLite, Where all communication is lite!
        </Typography>
      </Box>
      <Form />
    </Box>
  );
};
export default LoginPage;
